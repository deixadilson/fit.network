export const state = () => ({
  sessions: [],
  sets: [],
  showAddSession: false,
  showAddSet: false,
  clicked: null
});

export const mutations = {
  addSession(state, session) {
    state.sessions.push(session);
  },
  addSet(state, set) {
    state.sets.push(set);
  },
  setShowAddSession(state, flag) {
    state.showAddSession = flag;
  },
  setShowAddSet(state, flag) {
    state.showAddSet = flag;
  },
  setClicked(state, value) {
    state.clicked = value;
  }
}

export const getters = {
  session: (state) => (id) => {
    return state.sessions.find(session => session.id == id);
  },
  sessionsByDate: (state) => (date) => {
    return state.sessions.filter(session => session.date === date);
  },
  setsInSession: (state) => (sessionId) => {
    return state.sets.filter(set => set.session == sessionId);
  }
}