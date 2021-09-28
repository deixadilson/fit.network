export const state = () => ({
  sessions: [],
  sets: [],
  showModal: '',
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
    const newId = Date.now();
    session.id = newId;
    state.sessions.push(session);
    sets = sets.map((set, i) => ({...set, id: i + 1, session: newId}));
    state.sets = state.sets.concat(sets);
    localStorage.setItem('sessions', JSON.stringify(state.sessions));
    localStorage.setItem('sets', JSON.stringify(state.sets));
  },
  loadSessions(state, sessions) {
    state.sessions = sessions;
  },
  addSet(state, set) {
    state.sets.push(set);
    localStorage.setItem('sets', JSON.stringify(state.sets));
  },
  editSet(state, set) {
    state.sets.splice(state.sets.findIndex(x => x.id === set.id && x.session === set.session), 1, set);
    localStorage.setItem('sets', JSON.stringify(state.sets));
  },
  deleteSet(state, set) {
    state.sets = state.sets.filter(el => el.id !== set.id && el.session !== set.session);
    for (let i = 0; i < session.length; i++) session[i].id = i + 1;
    localStorage.setItem('sets', JSON.stringify(state.sets));
  },
  orderSets(state, {sessionId, a, b}) {
    let sets = state.sets.filter(x => x.session !== sessionId);
    let session = state.sets.filter(x => x.session === sessionId);
    let [dragged] = session.splice(a,1);
    session.splice(b,0,dragged);
    for (let i = 0; i < session.length; i++) session[i].id = i + 1;
    sets = sets.concat(session);
    state.sets = sets;
    localStorage.setItem('sets', JSON.stringify(state.sets));
  },
  loadSets(state, sets) {
    state.sets = sets;
  },
  setShowModal(state, modal) {
    state.showModal = modal;
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