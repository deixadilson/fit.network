<template>
  <div>
    <Overlay/>
    <form @submit.prevent="submit">
      <section>
        <header>
          <h2>{{ action }} Session</h2>
        </header>
        <main>
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
            <input type="number" id="duration" name="duration" v-model.number="duration" min="0"/> minutes
          </div>
        </main>
        <footer class="buttons">
          <button type="submit">{{ action }} Session</button>
          <button type="button" @click="close">Cancel</button>
          <button type="button" @click="close" class="close">&times;</button>
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
        id: this.$store.state.ref?.id,
        title: this.$store.state.ref?.title,
        date: this.$store.state.ref?.date,
        time: this.$store.state.ref?.time,
        duration: +this.$store.state.ref?.duration
      }
    },
    computed: {
      submit() {
        if (this.action == 'Add') return this.add;
        if (this.action == 'Edit') return this.edit;
        if (this.action == 'Copy') return this.copy;
      }
    },
    mounted() {
      document.forms[0].title.focus();
    },
    methods: {
      close() {
        this.$store.commit('setShowModal', '');
        this.$store.commit('setAction', '');
        this.$store.commit('setRef', '');
      },
      add() {
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
      edit() {
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
      copy() {
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
  input[name="duration"] {
    width: 50px;
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
