export const state = () => ({
  sessions: [],
  sets: [],
  showAddSession: false,
  showDeleteSession: false,
  showAddSet: false,
  showDeleteSet: false,
  action: '',
  ref: ''
});

export const mutations = {
  addSession(state, session) {
    state.sessions.push(session);
    localStorage.setItem('sessions', JSON.stringify(state.sessions));
  },
  editSession(state, session) {
    state.sessions.splice(state.sessions.findIndex(x => x.id == session.id), 1 , session);
    localStorage.setItem('sessions', JSON.stringify(state.sessions));
  },
  deleteSession(state, id) {
    state.sets = state.sets.filter(set => set.session != id);
    state.sessions = state.sessions.filter(session => session.id != id);
    localStorage.setItem('sets', JSON.stringify(state.sets));
    localStorage.setItem('sessions', JSON.stringify(state.sessions));
  },
  copySession(state, session) {
    let sets = state.sets.filter(set => set.session == session.id);

    const newId = new Date();
    
    sets = sets.map(set => ({...set, session: newId}));
    state.sets = state.sets.concat(sets);

    session.id = newId;
    state.sessions.push(session);
    
  },
  loadSessions(state, sessions) {
    state.sessions = sessions;
  },
  addSet(state, set) {
    state.sets.push(set);
    localStorage.setItem('sets', JSON.stringify(state.sets));
  },
  editSet(state, set) {
    state.sets.splice(state.sets.findIndex(x => x.id === set.id), 1, set);
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
  setShowDeleteSession(state, flag) {
    state.showDeleteSession = flag;
  },
  setShowAddSet(state, flag) {
    state.showAddSet = flag;
  },
  setShowDeleteSet(state, flag) {
    state.showDeleteSet = flag;
  },
  setAction(state, value) {
    state.action = value;
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