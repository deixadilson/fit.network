<template>
  <div>
    <Overlay/>
    <form @submit.prevent="submit">
      <section>
        <header>
          <h2>{{ action }} Set</h2>
        </header>
        <main>
          <input type="hidden" name="session" v-model="session">
          <div>
            <label for="exercise">Exercise</label>
            <input type="text" id="exercise" name="exercise" v-model="exercise" required/>
          </div>
          <div>
            <label for="weight">Weight</label>
            <input type="number" id="weight" name="weight" min="0" v-model.number="weight"/> kg
          </div>
          <div>
            <label for="reps">Repetitions</label>
            <input type="number" id="reps" name="reps" min="1" v-model.number="reps"/>
          </div>
          <div>
            <label for="rest">Rest Time</label>
            <input type="number" id="rest" name="rest" min="0.0" v-model.number="rest"/> seconds
          </div>
          <div>
            <label for="comment">Comment</label>
            <input type="text" id="comment" name="comment" v-model="comment"/>
          </div>
        </main>
        <footer class="buttons">
          <button type="submit">{{ action }} Set</button>
          <button type="button" @click="cancel">Cancel</button>
          <button type="button" @click="cancel" class="close">&times;</button>
        </footer>
      </section>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        action: this.$store.state.action,
        session: +this.$route.params.id,
        exercise: this.$store.state.ref?.exercise,
        weight: this.$store.state.ref?.weight,
        reps: this.$store.state.ref?.reps,
        rest: this.$store.state.ref?.rest,
        comment: this.$store.state.ref?.comment
      }
    },
    computed: {
      submit() {
        if (this.action == 'Add') return this.add;
        if (this.action == 'Edit') return this.edit;
      }
    },
    mounted() {
      document.forms[0].exercise.focus();
    },
    methods: {
      add() {
        const set = {
          id: this.$store.getters.setsInSession(this.session).length + 1,
          session: this.session,
          exercise: this.exercise,
          weight: this.weight,
          reps: this.reps,
          rest: this.rest,
          comment: this.comment
        };
        this.$store.commit('addSet', set);
        this.cancel();
      },
      edit() {
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
        this.$store.commit('setShowModal', '');
        this.$store.commit('setAction', '');
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
    width: 500px;
    background: #fff;
    border-radius: 10px;
  }
  section {
    box-shadow: 0 3px 5px #555;
  }
  h2 {
    margin: 0;
  }
  main {
    padding: 10px 10px 0;
    border-top: 1px solid #eee;
  }
  div {
    margin-bottom: 10px;
  }
  label {
    display: block;
    font-size: 12px;
    font-weight: bold;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  @media (max-width: 500px) {
    form {
      left: calc(50% - 150px);
      width: 300px;
    }
  }
</style>
