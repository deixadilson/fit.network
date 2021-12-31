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
    <AddSession v-if="showModal == 'AddSession'"/>
    <DeleteSession v-if="showModal == 'DeleteSession'"/>
  </div>
</template>

<script>
  export default {
    computed: {
      sessions() {
        return this.$store.state.sessions;
      },
      showModal() {
        return this.$store.state.showModal;
      }
    },
    methods: {
      addSession() {
        this.$store.commit('setShowModal', 'AddSession');
        this.$store.commit('setAction', 'Add');
      },
      editSession(session) {
        this.$store.commit('setRef', { ...session, date: session.date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$2-$1') });
        this.$store.commit('setAction', 'Edit');
        this.$store.commit('setShowModal', 'AddSession');
      },
      copySession(session) {
        this.$store.commit('setRef', session);
        this.$store.commit('setAction', 'Copy');
        this.$store.commit('setShowModal', 'AddSession');
      },
      deleteSession(session) {
        this.$store.commit('setRef', session);
        this.$store.commit('setShowModal', 'DeleteSession');
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
    grid-template-columns: 30px auto 120px 100px 100px 100px;
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
      grid-template-columns: 30px auto 60px 40px 60px 95px;
    }
  }
</style>