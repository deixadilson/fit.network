<template>
  <div>
    <Overlay/>
    <form @submit.prevent="addSet">
      <input type="hidden" name="session" :value="sessionId">
      <div>
        <label for="exercise">Exercise</label>
        <input type="text" id="exercise" name="exercise"/>
      </div>
      <div>
        <label for="weight">Weight</label>
        <input type="number" id="weight" name="weight" min="0"/> kg
      </div>
      <div>
        <label for="reps">Repetittions</label>
        <input type="number" id="reps" name="reps" min="1"/>
      </div>
      <div>
        <label for="rest">Rest Time</label>
        <input type="number" id="rest" name="rest" min="0.0"/> seconds
      </div>
      <div>
        <label for="comment">Comment</label>
        <input type="text" id="comment" name="comment"/>
      </div>
      <button type="submit">Add Set</button>
      <button type="button" @click="cancel">Cancel</button>
      <button type="button" @click="cancel" class="close">&times;</button>
    </form>
  </div>
</template>

<script>
  export default {
    props: ['sessionId'],
    methods: {
      addSet(e) {
        const set = {
          id: Date.now(),
          session: e.target.session.value,
          exercise: e.target.exercise.value,
          weight: e.target.weight.value,
          repetitions: e.target.reps.value,
          rest: e.target.rest.value,
          comment: e.target.comment.value
        };
        this.$store.commit('addSet', set);
        this.$store.commit('setShowAddSet', false);
      },
      cancel() {
        this.$store.commit('setShowAddSet', false);
      }
    }
  }
</script>

<style scoped>
  form {
    position: absolute;
    left: calc(50% - 250px);
    background: #fff;
    width: 500px;
    padding: 20px;
    box-shadow: 0 10px 22px #666;
    border-radius: 3px;
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
