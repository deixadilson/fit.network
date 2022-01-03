export const state = () => ({
  rest: 1,
  weight: 'kg',
  sessions: [],
  sets: [],
  measurements: [],
  showModal: '',
  action: '',
  ref: ''
});

export const mutations = {
  addSession(state, session) {
    state.sessions.unshift(session);
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
    state.sessions.unshift(session);
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
    state.sets.splice(state.sets.findIndex(x => x.id == set.id && x.session == set.session), 1, set);
    localStorage.setItem('sets', JSON.stringify(state.sets));
  },
  deleteSet(state, set) {
    let sets = state.sets.filter(x => x.session != set.session);
    let session = state.sets.filter(x => x.session == set.session && x.id != set.id);
    for (let i = 0; i < session.length; i++) session[i].id = i + 1;
    sets = sets.concat(session);
    state.sets = sets;
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
  addMeasurement(state, measurement) {
    state.measurements.push(measurement);
    localStorage.setItem('measurements', JSON.stringify(state.measurements));
  },
  editMeasurement(state, measurement) {
    state.measurements.splice(state.measurements.findIndex(x => x.id == measurement.id), 1, measurement);
    localStorage.setItem('measurements', JSON.stringify(state.measurements));
  },
  deleteMeasurement(state, id) {
    state.measurements = state.measurements.filter(measurement => measurement.id != id);
  },
  loadMeasurements(state, measurements) {
    state.measurements = measurements;
  },
  saveSettings(state, {weight, rest}) {
    state.weight = weight;
    state.rest = rest;
    localStorage.setItem('settings', `{"weight": "${weight}","rest":"${rest}"}`);
  },
  loadSettings(state, settings) {
    state.weight = settings.weight;
    state.rest = settings.rest;
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
  },
  measurement: (state) => (id) => {
    return state.measurements.find(measurement => measurement.id == id);
  }
}