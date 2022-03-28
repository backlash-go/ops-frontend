const state = {
  token: '',
  ID: '',
  name: '',
  email: '',
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ID: (state, ID) => {
    state.ID = ID;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_EMAIL: (state, email) => {
    state.email = email;
  },
};

const actions = {

}



export default {
  namespaced: true,
  state,
  mutations,
  actions
};