<template>
  <div class="container">
    <h1>Fit.Network</h1>
    <div v-if="sessions.length" class="session sessions-header">
      <div>#</div>
      <div>Title</div>
      <div>Date</div>
      <div>Time</div>
      <div>Duration</div>
    </div>
    <div v-for="(session, index) in sessions" :key="index" class="session">
      <div>{{ index + 1 }}</div>
      <div><NuxtLink :to="`/session/${session.id}`">{{ session.title }}</NuxtLink></div>
      <div>{{ session.date }}</div>
      <div>{{ session.time }}</div>
      <div>{{ session.duration }} minutes</div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      sessions() {
        return this.$store.state.sessions;
      }
    }
  }
</script>

<style>
  .container {
    max-width: 1024px;
    margin: 0 auto;
  }
  .container > .session {
    display: grid;
    width: 100%;
    grid-template-columns: 20px auto 100px 100px 100px;
    margin-bottom: 20px;
  }
  .sessions-header {
    font-weight: bold;
  }
</style>