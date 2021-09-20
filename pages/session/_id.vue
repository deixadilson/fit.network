<template>
  <div class="container">
    <h2>{{ session.title }} {{ session.date }} {{ session.time }}</h2>
    <section>
      <header class="row">
        <div>#</div>
        <div>Exercício</div>
        <div>Weight</div>
        <div>Reps</div>
        <div>Rest Time</div>
        <div>Actions</div>
      </header>
      <main v-for="(set, index) in sets" class="row">
        <div>{{ index + 1 }}</div>
        <div>{{ set.exercise }}</div>
        <div>{{ set.weight }} kg</div>
        <div>{{ set.reps }}</div>
        <div>{{ set.rest }} s</div>
        <div>
          <button type="button" @click="editSet(set)" title="Edit Set">🖊</button>
          <button type="button" @click="deleteSet(set)" class="delete" title="Delete Set">❌</button>
        </div>
        <div class="set-comment">{{ set.comment }}</div>
      </main>
      <footer class="buttons">
        <button @click="addSet">Add Set</button>
      </footer>
    </section>
    <AddSet v-if="showAddSet"/>
    <DeleteSet v-if="showDeleteSet"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        session: ''
      }
    },
    mounted() {
      this.session = this.$store.getters.session(this.$route.params.id);
    },
    computed: {
      sets() {
        return this.$store.getters.setsInSession(this.session.id);
      },
      showAddSet() {
        return this.$store.state.showAddSet;
      },
      showDeleteSet() {
        return this.$store.state.showDeleteSet;
      }
    },
    methods: {
      addSet() {
        this.$store.commit('setAction', 'Add');
        this.$store.commit('setShowAddSet', true);
      },
      editSet(set) {
        this.$store.commit('setRef', set);
        this.$store.commit('setAction', 'Edit');
        this.$store.commit('setShowAddSet', true);
      },
      deleteSet(set) {
        this.$store.commit('setRef', set);
        this.$store.commit('setShowDeleteSet', true);
      }
    }
  }
</script>

<style scoped>
  .set-comment {
    grid-area: 2 / 2 / 2 / 6;
  }
  .delete {
    color: #f00;
    font-weight: bold;
  }
</style>