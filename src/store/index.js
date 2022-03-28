import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user.js';

import app from './modules/app.js';

import getters from "@/store/modules/getters.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    app
  },
  getters
});
