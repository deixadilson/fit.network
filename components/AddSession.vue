<template>
  <div>
    <Overlay/>
    <form>
      <h2>{{ action }} Session</h2>
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" name="title" v-model="title" required/>
      </div>
      <!--<div>
        <label for="color">Color</label>
        <input type="color" id="color" name="color" value="#00ffff" required/>
      </div>-->
      <div>
        <label for="date">Date</label>
        <input type="date" id="date" name="date" v-model="date" required/>
      </div>
      <div>
        <label for="time">Start time</label>
        <input type="time" id="time" name="time" v-model="time"/>
      </div>
      <div>
        <label for="duration">Duration</label>
        <input type="number" id="duration" name="duration" v-model="duration" min="0"/> minutes
      </div>
      <button type="button" v-if="action == 'Add'" @click="addSession">Add Session</button>
      <button type="button" v-if="action == 'Edit'" @click="editSession">Edit Session</button>
      <button type="button" v-if="action == 'Copy'" @click="copySession">Copy Session</button>
      <button type="button" @click="close">Cancel</button>
      <button type="button" @click="close" class="close">&times;</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        action: this.$store.state.action,
        id: this.$store.state.ref?.id,
        title: this.$store.state.ref?.title,
        date: this.$store.state.ref?.date,
        time: this.$store.state.ref?.time,
        duration: this.$store.state.ref?.duration
      }
    },
    methods: {
      close() {
        this.$store.commit('setShowAddSession', false);
        this.$store.commit('setAction', '');
        this.$store.commit('setRef', '');
      },
      addSession() {
        const session = {
          id: Date.now(),
          title: this.title,
          //color: this.color,
          date: this.date.replace(/(\d{4})-(\d\d)-(\d\d)/, '$3/$2/$1'),
          time: this.time,
          duration: this.duration
        };
        this.$store.commit('addSession', session);
        this.close();
      },
      editSession() {
        const session = {
          id: this.$store.state.ref.id,
          title: this.title,
          date: this.date.replace(/(\d{4})-(\d\d)-(\d\d)/, '$3/$2/$1'),
          time: this.time,
          duration: this.duration
        }
        this.$store.commit('editSession', session);
        this.close();
      },
      copySession() {
        const session = {
          id: this.id,
          title: this.title,
          date: this.date.replace(/(\d{4})-(\d\d)-(\d\d)/, '$3/$2/$1'),
          time: this.time,
          duration: this.duration
        }
        this.$store.commit('copySession', session);
        this.close();
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
  input[name="duration"] {
    width: 50px;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>
