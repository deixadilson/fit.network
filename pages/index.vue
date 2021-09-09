<template>
  <div>
    <h1>Fit.Network</h1>
    <ul><li v-for="(session, i) in sessions" :key="i">{{session.date}} {{session.title}} {{session.time}} {{session.duration}} minutes</li></ul>
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