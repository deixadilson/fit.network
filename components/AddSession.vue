<template>
  <div>
    <Overlay/>
    <form @submit.prevent="addSession">
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" name="title" required/>
      </div>
      <div>
        <label for="color">Color</label>
        <input type="color" id="color" name="color" value="#00ffff" required/>
      </div>
      <div>
        <label for="date">Date</label>
        <input type="text" id="date" name="date" v-model="ref" required disabled/>
      </div>
      <div>
        <label for="time">Start time</label>
        <input type="time" id="time" name="time"/>
      </div>
      <div>
        <label for="duration">Duration</label>
        <input type="number" id="duration" name="duration" min="0"/> minutes
      </div>
      <button type="submit">Save Session</button>
      <button type="button" @click="closeModal">Cancel</button>
      <button type="button" @click="closeModal" class="close">&times;</button>
    </form>
  </div>
</template>

<script>
  export default {
    computed: {
      ref() {
        return this.$store.state.ref;
      }
    },
    methods: {
      closeModal() {
        this.$store.commit('setShowAddSession', false);
        this.$store.commit('setRef', null);
      },
      addSession(e) {
        const session = {
          id: Date.now(),
          title: e.target.title.value,
          color: e.target.color.value,
          date: e.target.date.value,
          time: e.target.time.value,
          duration: e.target.duration.value
        };
        this.$store.commit('addSession', session);
        this.closeModal();
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
  div {
    margin-bottom: 10px;
  }
  label {
    display: block;
  }
  input[name="duration"] {
    width: 50px;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>
