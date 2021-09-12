<template>
  <div>
    <Overlay/>
    <form @submit.prevent="addSet">
      <h2 v-if="$store.state.ref">Edit Set</h2>
      <h2 v-else>Add Set</h2>
      <input type="hidden" name="session" v-model="session">
      <div>
        <label for="exercise">Exercise</label>
        <input type="text" id="exercise" name="exercise" v-model="exercise"/>
      </div>
      <div>
        <label for="weight">Weight</label>
        <input type="number" id="weight" name="weight" min="0" v-model="weight"/> kg
      </div>
      <div>
        <label for="reps">Repetitions</label>
        <input type="number" id="reps" name="reps" min="1" v-model="reps"/>
      </div>
      <div>
        <label for="rest">Rest Time</label>
        <input type="number" id="rest" name="rest" min="0.0" v-model="rest"/> seconds
      </div>
      <div>
        <label for="comment">Comment</label>
        <input type="text" id="comment" name="comment" v-model="comment"/>
      </div>
      <button type="button" v-if="$store.state.ref" @click="editSet">Edit Set</button>
      <button  v-else type="submit">Add Set</button>
      <button type="button" @click="cancel">Cancel</button>
      <button type="button" @click="cancel" class="close">&times;</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        session: this.$route.params.id,
        exercise: this.$store.state.ref?.exercise,
        weight: this.$store.state.ref?.weight,
        reps: this.$store.state.ref?.reps,
        rest: this.$store.state.ref?.rest,
        comment: this.$store.state.ref?.comment
      }
    },
    methods: {
      addSet() {
        const set = {
          id: Date.now(),
          session: this.session,
          exercise: this.exercise,
          weight: this.weight,
          reps: this.reps,
          rest: this.rest,
          comment: this.comment
        };
        this.$store.commit('addSet', set);
        this.$store.commit('setShowAddSet', false);
      },
      editSet() {
        const set = {
          id: this.$store.state.ref.id,
          session: this.session,
          exercise: this.exercise,
          weight: this.weight,
          reps: this.reps,
          rest: this.rest,
          comment: this.comment
        };
        this.$store.commit('editSet', set);
        this.cancel();
      },
      cancel() {
        this.$store.commit('setShowAddSet', false);
        this.$store.commit('setRef', '');
      }
    }
  }
</script>

<style scoped>
  form {
    position: absolute;
    top: 50px;
    left: calc(50% - 250px);
    background: #fff;
    width: 500px;
    padding: 20px;
    box-shadow: 0 10px 22px #666;
    border-radius: 3px;
  }
  h2 {
    margin-top: 0;
  }
  div {
    margin-bottom: 10px;
  }
  label {
    display: block;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>
