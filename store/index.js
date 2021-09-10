export const state = () => ({
  sessions: [],
  sets: [],
  showAddSession: false,
  showAddSet: false,
  showDeleteSet: false,
  ref: null
});

export const mutations = {
  addSession(state, session) {
    state.sessions.push(session);
    localStorage.setItem('sessions', JSON.stringify(state.sessions));
  },
  loadSessions(state, sessions) {
    state.sessions = sessions;
  },
  addSet(state, set) {
    state.sets.push(set);
    localStorage.setItem('sets', JSON.stringify(state.sets));
  },
  deleteSet(state, id) {
    state.sets = state.sets.filter(set => set.id != id);
    localStorage.setItem('sets', JSON.stringify(state.sets));
  },
  loadSets(state, sets) {
    state.sets = sets;
  },
  setShowAddSession(state, flag) {
    state.showAddSession = flag;
  },
  setShowAddSet(state, flag) {
    state.showAddSet = flag;
  },
  setShowDeleteSet(state, flag) {
    state.showDeleteSet = flag;
  },
  setRef(state, value) {
    state.ref = value;
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