import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user.js';

import app from './modules/app.js';

import settings from "@/store/modules/settings.js";

import getters from "@/store/modules/getters.js";


import permission from "@/store/modules/permission.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    app,
    settings,
    permission
  },
  getters
});
