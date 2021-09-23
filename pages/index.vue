<template>
  <div class="container">
    <h1>Session List</h1>
    <section>
      <header class="row">
        <div>#</div>
        <div>Title</div>
        <div>Date</div>
        <div>Time</div>
        <div>Duration</div>
        <div>Actions</div>
      </header>
      <main>
        <div v-for="(session, index) in sessions" :key="index" class="row">
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
      </main>
      <footer class="buttons">
        <button type="button" @click="addSession">Add Session</button>
      </footer>
    </section>
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
  section {
    box-shadow: 0 3px 5px #ccc;
    border-radius: 10px;
  }
  .container {
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 5px;
  }
  .row {
    display: grid;
    grid-template-columns: 20px auto 100px 100px 100px 100px;
    align-items: center;
    border-top: 1px solid #eee;
    padding: 5px 10px;
  }
  header {
    padding-top: 10px;
  }
  section > header, .buttons {
    font-weight: bold;
    padding: 10px 10px 6px;
    border-radius: 10px 10px 0 0;
    background: #fcfcfc;
  }
  .actions {
    display: flex;
    justify-content: space-between;
  }
  .buttons {
    border-radius: 0 0 10px 10px;
    padding: 5px 10px 10px;
    border-top: 1px solid #eee;
  }
  @media (max-width: 600px) {
    .row {
      font-size: 10px;
      grid-template-columns: 10px auto 60px 40px 60px 95px;
    }
  }
</style>