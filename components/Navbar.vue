<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <NuxtLink to="/">Workouts</NuxtLink>
        <NuxtLink to="/month">Calendar</NuxtLink>
        <NuxtLink to="/measurements">Measures</NuxtLink>
        <button type="button" @click="settings()">Settings</button>
      </div>
    </div>
    <Settings v-if="showModal == 'Settings'"/>
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

        const measurements = JSON.parse(localStorage.getItem('measurements'));
        this.$store.commit('loadMeasurements', measurements);
      }
      if(!this.$store.settings && localStorage.getItem('settings')) {
        const settings = JSON.parse(localStorage.getItem('settings'));
        this.$store.commit('loadSettings', settings);
      }
    },
    computed: {
      showModal() {
        return this.$store.state.showModal;
      }
    },
    methods: {
      settings() {
        this.$store.commit('setShowModal', 'Settings');
      }
    }
  }
</script>

<style scoped>
  a, button {
    color: #eee;
    font-size: 14px;
    background: #555;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
  }
  a:hover, button:hover {
    background: #777;
  }
  .wrapper {
    background: #000;
    padding: 10px 0;
    box-shadow: 0 0 10px #555;
  }
</style>