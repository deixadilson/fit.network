<template>
  <div>
    <Overlay/>
    <form @submit.prevent="deleteSet(set.id)">
      <h2>Delete Set</h2>
      <div>Are you sure you want to delete {{ set.exercise }} set?</div>
      <button type="submit">Delete Set</button>
      <button type="button" @click="cancel">Cancel</button>
      <button type="button" @click="cancel" class="close">&times;</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        set: this.$store.state.ref
      }
    },
    methods: {
      deleteSet(id) {
        this.$store.commit('deleteSet', id);
        this.cancel();
      },
      cancel() {
        this.$store.commit('setShowDeleteSet', false);
        this.$store.commit('setRef', null);
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
  h2 {
    margin-top: 0;
  }
  div {
    margin-bottom: 10px;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>