<template>
  <div class="container">
    <h2>{{ session.title }} {{ session.date }} {{ session.time }}</h2>
    <div>
      <div v-if="sets.length" class="set set-header">
        <div>#</div>
        <div>Exercício</div>
        <div>Weight</div>
        <div>Repetitions</div>
        <div>Rest Time</div>
      </div>
      <div v-for="(set, index) in sets" class="set">
        <div>{{ index + 1 }}</div>
        <div>{{ set.exercise }}</div>
        <div>{{ set.weight }} kg</div>
        <div>{{ set.repetitions }}</div>
        <div>{{ set.rest }} s</div>
        <div class="set-comment">{{ set.comment }}</div>
      </div>
      <button @click="setShowAddSet(true)">Add Set</button>
    </div>
    <AddSet v-if="showAddSet" :sessionId="session.id"/>
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
      showAddSet() {
        return this.$store.state.showAddSet;
      },
      showAddCardio() {
        return this.$store.state.showAddCardio;
      }
    },
    methods: {
      setShowAddSet(flag) {
        this.$store.commit('setShowAddSet', flag);
      },
      setShowAddCardio(flag) {
        this.$store.commit('setShowAddCardio', flag);
      }
    }
  }
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
}
.set {
  display: grid;
  width: 100%;
  grid-template-columns: 20px auto 100px 100px 100px;
  margin-bottom: 20px;
}
.set-header {
  font-weight: bold;
}
.set-comment {
  grid-area: 2 / 2 / 2 / 5;
}
</style>