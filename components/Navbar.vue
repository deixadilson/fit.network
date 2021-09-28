<template>
  <div class="wrapper">
    <div class="container">
      <NuxtLink to="/">Workouts</NuxtLink>
      <NuxtLink to="/month">Calendar</NuxtLink>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      if(!this.$store.sessions && localStorage.getItem('sessions')) {
        const sessions = JSON.parse(localStorage.getItem('sessions'));
        this.$store.commit('loadSessions', sessions);

        const sets = JSON.parse(localStorage.getItem('sets')) || [];
        this.$store.commit('loadSets', sets);
      }
    }
  }
</script>

<style scoped>
  a {
    color: #eee;
    background: #555;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 5px;
  }
  a:hover {
    background: #777;
  }
  .wrapper {
    background: #000;
    padding: 10px 0;
    box-shadow: 0 0 10px #555;
  }
</style>