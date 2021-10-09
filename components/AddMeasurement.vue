<template>
  <div>
    <Overlay/>
    <form @submit.prevent="submit">
      <section>
        <header>
          <h2>{{ action }} Measurement</h2>
        </header>
        <main>
          <input type="hidden" name="session" v-model="session">
          <div>
            <label for="date">Date</label>
            <input type="date" id="date" name="date" v-model="date" required/>
          </div>
          <div>
            <label for="shoulder">Shoulder</label>
            <input type="number" id="shoulder" name="shoulder" min="0" v-model.number="shoulder"/> cm
          </div>
          <div>
            <label for="chest">Chest</label>
            <input type="number" id="chest" name="chest" min="0" v-model.number="chest"/> cm
          </div>
          <div>
            <label for="waist">Waist</label>
            <input type="number" id="waist" name="waist" min="0" v-model.number="waist"/> cm
          </div>
          <div>
            <label for="abs">Abs</label>
            <input type="number" id="abs" name="abs" min="0" v-model.number="abs"/> cm
          </div>
          <div>
            <label for="hips">Hips</label>
            <input type="number" id="hips" name="hips" min="0" v-model.number="hips"/> cm
          </div>
          <div>
            <label for="l-thigh">Left Thigh</label>
            <input type="number" id="l-thigh" name="l-thigh" min="0" v-model.number="lThigh"/> cm
          </div>
          <div>
            <label for="r-thigh">Right Thigh</label>
            <input type="number" id="r-thigh" name="r-thigh" min="0" v-model.number="rThigh"/> cm
          </div>
          <div>
            <label for="l-bicep">Left Picep</label>
            <input type="number" id="l-bicep" name="l-bicep" min="0" v-model.number="lBicep"/> cm
          </div>
          <div>
            <label for="r-bicep">Right Picep</label>
            <input type="number" id="r-bicep" name="r-bicep" min="0" v-model.number="rBicep"/> cm
          </div>
          <div>
            <label for="l-forearm">Left Forearm</label>
            <input type="number" id="l-forearm" name="l-forearm" min="0" v-model.number="lForearm"/> cm
          </div>
          <div>
            <label for="r-forearm">Right Forearm</label>
            <input type="number" id="r-forearm" name="r-forearm" min="0" v-model.number="rForearm"/> cm
          </div>
          <div>
            <label for="l-calves">Left Calves</label>
            <input type="number" id="l-calves" name="l-calves" min="0" v-model.number="lCalves"/> cm
          </div>
          <div>
            <label for="r-calves">Right Calves</label>
            <input type="number" id="r-calves" name="r-calves" min="0" v-model.number="rCalves"/> cm
          </div>
        </main>
        <footer class="buttons">
          <button type="button" v-if="action == 'Add'" @click="add">Add Measurement</button>
          <button type="button" v-if="action == 'Edit'" @click="edit">Edit Measurement</button>
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
        date: this.$store.state.ref?.date,
        shoulder: this.$store.state.ref?.shoulder,
        chest: this.$store.state.ref?.chest,
        waist: this.$store.state.ref?.waist,
        abs: this.$store.state.ref?.abs,
        hips: this.$store.state.ref?.hips,
        lThigh: this.$store.state.ref?.lThigh,
        rThigh: this.$store.state.ref?.rThigh,
        lBicep: this.$store.state.ref?.lBicep,
        rBicep: this.$store.state.ref?.rBicep,
        lForearm: this.$store.state.ref?.lForearm,
        rForearm: this.$store.state.ref?.rForearm,
        lCalves: this.$store.state.ref?.lCalves,
        rCalves: this.$store.state.ref?.rCalves,
      }
    },
    computed: {
      submit() {
        if (this.action == 'Add') return this.add;
        if (this.action == 'Edit') return this.edit;
      }
    },
    mounted() {
      document.forms[0].date.focus();
    },
    methods: {
      add() {
        const measurement = {
          id: Date.now(),
          date: this.date.replace(/(\d{4})-(\d\d)-(\d\d)/, '$3/$2/$1'),
          shoulder: this.shoulder,
          chest: this.chest,
          waist: this.waist,
          abs: this.abs,
          hips: this.hips,
          lThigh: this.lThigh,
          rThigh: this.rThigh,
          lBicep: this.lBicep,
          rBicep: this.rBicep,
          lForearm: this.lForearm,
          rForearm: this.rForearm,
          lCalves: this.lCalves,
          rCalves: this.rCalves,
        };
        this.$store.commit('addMeasurement', measurement);
        this.cancel();
      },
      edit() {
        const measurement = {
          id: this.$store.state.ref.id,
          date: this.date.replace(/(\d{4})-(\d\d)-(\d\d)/, '$3/$2/$1'),
          shoulder: this.shoulder,
          chest: this.chest,
          waist: this.waist,
          abs: this.abs,
          hips: this.hips,
          lThigh: this.lThigh,
          rThigh: this.rThigh,
          lBicep: this.lBicep,
          rBicep: this.rBicep,
          lForearm: this.lForearm,
          rForearm: this.rForearm,
          lCalves: this.lCalves,
          rCalves: this.rCalves,
        };
        this.$store.commit('editMeasurement', measurement);
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