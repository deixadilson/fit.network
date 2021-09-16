<template>
  <div class="container">
    <h1>Session List</h1>
    <div v-if="sessions.length" class="session sessions-header">
      <div>#</div>
      <div>Title</div>
      <div>Date</div>
      <div>Time</div>
      <div>Duration</div>
      <div>Actions</div>
    </div>
    <div v-for="(session, index) in sessions" :key="index" class="session">
      <div>{{ index + 1 }}</div>
      <div><NuxtLink :to="`/session/${session.id}`">{{ session.title }}</NuxtLink></div>
      <div>{{ session.date }}</div>
      <div>{{ session.time }}</div>
      <div>{{ session.duration }} min</div>
      <div class="actions">
        <button type="button" @click="editSession(session)" title="Edit Session">🖊</button>
        <button type="button" @click="copySession(session)" title="Copy Session">⧉</button>
        <button type="button" @click="deleteSession(session)" title="Delete Session">❌</button>
      </div>
    </div>
    <button type="button" @click="addSession">Add Session</button>
    <AddSession v-if="showAddSession"/>
    <DeleteSession v-if="showDeleteSession"/>
  </div>
</template>

<script>
  export default {
    computed: {
      sessions() {
        return this.$store.state.sessions;
      },
      showAddSession() {
        return this.$store.state.showAddSession;
      },
      showDeleteSession() {
        return this.$store.state.showDeleteSession;
      }
    },
    methods: {
      addSession() {
        this.$store.commit('setShowAddSession', true);
        this.$store.commit('setAction', 'Add');
      },
      editSession(session) {
        this.$store.commit('setRef', session);
        this.$store.commit('setAction', 'Edit');
        this.$store.commit('setShowAddSession', true);
      },
      copySession(session) {
        this.$store.commit('setRef', session);
        this.$store.commit('setAction', 'Copy');
        this.$store.commit('setShowAddSession', true);
      },
      deleteSession(session) {
        this.$store.commit('setRef', session);
        this.$store.commit('setShowDeleteSession', true);
      }
    }
  }
</script>

<style>
  body {
    font-family: sans-serif;
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  .container {
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 5px;
  }
  .container > .session {
    display: grid;
    grid-template-columns: 20px auto 100px 100px 100px 100px;
    align-items: center;
    margin-bottom: 20px;
  }
  .sessions-header {
    font-weight: bold;
  }
  .actions {
    display: flex;
    justify-content: space-between;
  }
  @media (max-width: 400px) {
    .session {
      font-size: 10px;
    }
    .container > .session {
      grid-template-columns: 10px auto 55px 40px 60px 95px;
      margin-bottom: 5px;
    }
  }
</style>