<template>
  <div>
    <Overlay/>
    <form @submit.prevent="submit">
      <section>
        <header>
          <h2>Settings</h2>
        </header>
        <main>
          <div>
            <div class="label">Weight unit</div>
            <input type="radio" v-model="weight" value="kg" id="kg"/>
            <label for="kg">kg</label>
            <input type="radio" v-model="weight" value="lb" id="lb"/>
            <label for="lb">lb</label>
          </div>
          <div>
            <div class="label">Record rest time</div>
            <input type="radio" v-model="rest" value="1" id="yes"/>
            <label for="yes">Yes</label>
            <input type="radio" v-model="rest" value="0" id="no"/>
            <label for="no">No</label>
          </div>
          <div>
            <div class="label">Export data</div>
            <a :href="`data:application/json;charset=utf-8,${json}`" download="data.json">Export</a>
          </div>
          <div>
            <div class="label">Import data</div>
            <input type="file" @change="loadData" accept="application/json"/>
          </div>
        </main>
        <footer class="buttons">
          <button type="submit">Save</button>
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
        weight: this.$store.state.weight || 'kg',
        rest: this.$store.state.rest || '1',
      }
    },
    computed: {
      json() {
        let sessions = localStorage.getItem('sessions');
        let sets = localStorage.getItem('sets');
        let measurements = localStorage.getItem('measurements');
        return `{"sessions":${sessions},"sets":${sets},"measurements":${measurements}}`;
      }
    },
    methods: {
      submit() {
        this.$store.commit('saveSettings', {weight: this.weight, rest: this.rest});
        this.cancel();
      },
      loadData(e) {
        const reader = new FileReader();
        reader.onload = e => {
          const json = JSON.parse(e.target.result);

          this.$store.commit('loadSessions', json.sessions);
          localStorage.setItem('sessions', JSON.stringify(json.sessions));

          this.$store.commit('loadSets', json.sets);
          localStorage.setItem('sets', JSON.stringify(json.sets));

          this.$store.commit('loadMeasurements', json.measurements);
          localStorage.setItem('measurements', JSON.stringify(json.measurements));
        }
        reader.readAsText(e.target.files[0]);
        this.cancel();
      },
      cancel() {
        this.$store.commit('setShowModal', '');
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
    margin: 0 10px;
  }
  main {
    padding: 10px 10px 0;
    border-top: 1px solid #eee;
  }
  div {
    margin-bottom: 10px;
  }
  label {
    font-size: 12px;
    font-weight: bold;
  }
  .label {
    font-weight: bold;
    margin: 0;
    font-size: 14px;
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