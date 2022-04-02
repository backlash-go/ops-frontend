import {constantRoutes} from "@/router";


const state = {
  routes: constantRoutes,
  addRoutes: [],
  age: 100212
};


const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes;
  }
};
const actions = {};


export default {
  namespaced: true,
  state,
  mutations,
  actions
};
