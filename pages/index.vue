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
      <div>{{ session.duration }} minutes</div>
      <div>
        <button type="button" @click="editSession(session)" title="Edit Session">🖊</button>
        <button type="button" @click="confirmDelete(session)" title="Delete Session">❌</button>
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
      },
      editSession(session) {
        this.$store.commit('setRef', session);
        this.$store.commit('setShowAddSession', true);
      },
      confirmDelete(session) {
        this.$store.commit('setRef', session);
        this.$store.commit('setShowDeleteSession', true);
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
    grid-template-columns: 20px auto 100px 100px 100px 100px;
    margin-bottom: 20px;
  }
  .sessions-header {
    font-weight: bold;
  }
</style>