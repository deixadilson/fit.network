<template>
  <div class="container">
    <NuxtLink to="/">My sessions</NuxtLink>
    <NuxtLink to="/month">Calendar View</NuxtLink>
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