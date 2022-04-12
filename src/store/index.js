import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user.js';

import app from './modules/app.js';

import settings from "@/store/modules/settings.js";

import getters from './getters';


import permission from "@/store/modules/permission.js";

Vue.use(Vuex);

const store =  new Vuex.Store({
  modules: {
    user,
    app,
    settings,
    permission
  },
  getters
});



export default store