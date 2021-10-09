<template>
  <div>
    <Overlay/>
    <form @submit.prevent="deleteMeasurement(measurement.id)">
      <section>
        <header>
          <h2>Delete Measurement</h2>
        </header>
        <main>Are you sure you want to delete measurement in <b>{{ measurement.date }}</b>?</main>
        <footer class="buttons">
          <button type="submit">Delete Session</button>
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
        measurement: this.$store.state.ref
      }
    },
    methods: {
      deleteMeasurement(id) {
        this.$store.commit('deleteMeasurement', id);
        this.cancel();
      },
      cancel() {
        this.$store.commit('setShowModal', '');
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
    padding: 10px;
    border-top: 1px solid #eee;
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