<template>
  <div class="container">
    <h2>Measurements in {{ measurement.date }}</h2>
    <section>
      <main>
        <div>
          <div>Shoulder</div>
          <div>{{ measurement.shoulder }} cm</div>
        </div>
        <div>
          <div>Chest</div>
          <div>{{ measurement.chest }} cm</div>
        </div>
        <div>
          <div>Waist</div>
          <div>{{ measurement.waist }} cm</div>
        </div>
        <div>
          <div>Abs</div>
          <div>{{ measurement.abs }} cm</div>
        </div>
        <div>
          <div>Hips</div>
          <div>{{ measurement.hips }} cm</div>
        </div>
        <div>
          <div>Left Thigh</div>
          <div>{{ measurement.lThigh }} cm</div>
        </div>
        <div>
          <div>Right Thigh</div>
          <div>{{ measurement.rThigh }} cm</div>
        </div>
        <div>
          <div>Left Picep</div>
          <div>{{ measurement.lBicep }} cm</div>
        </div>
        <div>
          <div>Right Picep</div>
          <div>{{ measurement.rBicep }} cm</div>
        </div>
        <div>
          <div>Left Forearm</div>
          <div>{{ measurement.lForearm }} cm</div>
        </div>
        <div>
          <div>Right Forearm</div>
          <div>{{ measurement.rForearm }} cm</div>
        </div>
        <div>
          <div>Left Calves</div>
          <div>{{ measurement.lCalves }} cm</div>
        </div>
        <div>
          <div>Right Calves</div>
          <div>{{ measurement.rCalves }} cm</div>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        measurement: this.$store.getters.measurement(this.$route.params.id)
      }
    }
  }
</script>

<style scoped>
  main > div {
    padding: 10px;
  }
  main > div div:first-child {
    font-weight: bold;
  }
</style>