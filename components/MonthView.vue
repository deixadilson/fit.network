<template>
  <div id="calendar">
    <div v-for="(day, index) in days" :key="index" :class="day.classes" @click.self="openModal(day)">
      {{ day.day }}
      <div v-for="(session, index) in day.sessions" :key="index" class="session">
        <NuxtLink :to="`/session/${session.id}`">{{ session.title }}</NuxtLink>
      </div>
    </div>
    <AddSession v-if="showAddSession"/>
  </div>
</template>

<script>
  export default {
    props: ['days'],
    computed: {
      showAddSession() {
        return this.$store.state.showAddSession;
      }
    },
    methods: {
      openModal(day) {
        if(day.date) {
          this.$store.commit('setRef', {date: day.date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$2-$1')});
          this.$store.commit('setAction', 'Add');
          this.$store.commit('setShowAddSession', true);
        }
      }
    }
  }
</script>

<style scoped>
  .session {
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 1px 1px 2px #ccc;
    padding: 0 5px;
    margin-bottom: 3px;
  }
  .day {
    box-sizing: border-box;
    width: calc(100% / 7);
    padding: 10px;
    height: 100px;
    float: left;
  }
  .today {
    outline: 2px solid #000;
  }
  .day:not(.padding) {
    box-shadow: 0 0 5px #ccc;
  }
  @media (max-width: 900px) {
    #calendar {
      font-size: 10px;
    }
    .day {
      padding: 5px;
    }
  }
</style>