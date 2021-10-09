<template>
  <div class="container">
    <h1>Measurements</h1>
    <section>
      <header class="row">
        <div>#</div>
        <div>Date</div>
        <div>Actions</div>
      </header>
      <main>
        <div v-for="(measurement, index) in measurements" :key="index" class="row">
          <div>{{ index + 1 }}</div>
          <div><NuxtLink :to="`/measurement/${measurement.id}`">{{ measurement.date }}</NuxtLink></div>
          <div class="actions">
            <button type="button" @click="editMeasurement(measurement)" title="Edit Measurement">🖊</button>
            <button type="button" @click="deleteMeasurement(measurement)" title="Delete Measurement">❌</button>
          </div>
        </div>
      </main>
      <footer class="buttons">
        <button type="button" @click="addMeasurement">Add Measurement</button>
      </footer>
    </section>
    <AddMeasurement v-if="showModal == 'AddMeasurement'"/>
    <DeleteMeasurement v-if="showModal == 'DeleteMeasurement'"/>
  </div>
</template>

<script>
  export default {
    computed: {
      measurements() {
        return this.$store.state.measurements;
      },
      showModal() {
        return this.$store.state.showModal;
      }
    },
    methods: {
      addMeasurement() {
        this.$store.commit('setShowModal', 'AddMeasurement');
        this.$store.commit('setAction', 'Add');
      },
      editMeasurement(measurement) {
        this.$store.commit('setRef', { ...measurement, date: measurement.date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$2-$1') });
        this.$store.commit('setAction', 'Edit');
        this.$store.commit('setShowModal', 'AddMeasurement');
      },
      deleteMeasurement(measurement) {
        this.$store.commit('setRef', measurement);
        this.$store.commit('setShowModal', 'DeleteMeasurement');
      }
    }
  }
</script>

<style scoped>
  .row {
    grid-template-columns: 30px auto 100px;
  }
</style>