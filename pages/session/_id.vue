<template>
  <div class="container">
    <h2>{{ session.title }} {{ session.date }} {{ session.time }}</h2>
    <section>
      <header class="row">
        <div>#</div>
        <div>Exercício</div>
        <div>Weight</div>
        <div>Reps</div>
        <div v-if="$store.state.rest == '1'">Rest Time</div>
        <div>Actions</div>
      </header>
      <main>
        <div v-for="set in sets" :key="set.id" class="row" @drop.prevent="drop($event, set.id - 1)" @dragover.prevent @dragenter.prevent>
          <div>{{ set.id }}</div>
          <div draggable="true" @dragstart="drag($event, set.id - 1)">{{ set.exercise }}</div>
          <div>{{ $store.state.weight == 'lb' ? Math.round(set.weight * 0.45359237) : set.weight }} {{ $store.state.weight }}</div>
          <div>{{ set.reps }}</div>
          <div v-if="$store.state.rest == '1'">{{ set.rest }} s</div>
          <div>
            <button type="button" @click="editSet(set)" title="Edit Set">🖊</button>
            <button type="button" @click="deleteSet(set)" title="Delete Set">❌</button>
          </div>
          <div class="set-comment">{{ set.comment }}</div>
        </div>
      </main>
      <footer class="buttons">
        <button @click="addSet">Add Set</button>
      </footer>
    </section>
    <AddSet v-if="showModal == 'AddSet'"/>
    <DeleteSet v-if="showModal == 'DeleteSet'"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        session: this.$store.getters.session(this.$route.params.id)
      }
    },
    computed: {
      sets() {
        return this.$store.getters.setsInSession(this.session.id);
      },
      showModal() {
        return this.$store.state.showModal;
      }
    },
    methods: {
      addSet() {
        this.$store.commit('setAction', 'Add');
        this.$store.commit('setShowModal', 'AddSet');
      },
      editSet(set) {
        this.$store.commit('setRef', set);
        this.$store.commit('setAction', 'Edit');
        this.$store.commit('setShowModal', 'AddSet');
      },
      deleteSet(set) {
        this.$store.commit('setRef', set);
        this.$store.commit('setShowModal', 'DeleteSet');
      },
      drag(e, id) {
        e.dataTransfer.setData('dragged', id);
      },
      drop(e, id) {
        const dragged = e.dataTransfer.getData('dragged');
        this.$store.commit('orderSets', { sessionId: this.session.id, a: dragged, b: id });
      }
    }
  }
</script>

<style scoped>
  .set-comment {
    grid-area: 2 / 2 / 2 / 6;
  }
</style>