<template>
  <div>
    <Overlay/>
    <form @submit.prevent="deleteSession(session.id)">
      <h2>Delete Session</h2>
      <div>Are you sure you want to delete <b>{{ session.title }}</b> session and <b>ALL ITS SETS</b>?</div>
      <button type="submit">Delete Session</button>
      <button type="button" @click="cancel">Cancel</button>
      <button type="button" @click="cancel" class="close">&times;</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        session: this.$store.state.ref
      }
    },
    methods: {
      deleteSession(id) {
        this.$store.commit('deleteSession', id);
        this.cancel();
      },
      cancel() {
        this.$store.commit('setShowDeleteSession', false);
        this.$store.commit('setRef', '');
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