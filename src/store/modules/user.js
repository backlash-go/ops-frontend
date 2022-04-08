import UserApi from '@/api/user/user';
import {ACCESS_TOKEN} from "@/store/mutation-types";
import Vue from 'vue';


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
  login({commit}, userInfo) {
    const {username, password} = userInfo;
    return new Promise((resolve, reject) => {
      UserApi.Login({username: username, password: password}).request()
        .then(response => {
          const {data} = response;
          console.log(ACCESS_TOKEN);
          Vue.ls.set(ACCESS_TOKEN, data.token);
          resolve();
        }).catch(error => reject(error));
    });
  },
  logout({commit}, token) {
    return new Promise(((resolve, reject) => {
      UserApi.logOut().request().then(() => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        Vue.ls.remove(ACCESS_TOKEN);
        resolve();
      }).catch(error => reject(error));
    }));
  },
  GetInfo({commit}) {
    return new Promise(((resolve, reject) => {
      UserApi.getInfo().request()
        .then(({data}) => {
          commit('SET_TOKEN', data.token);
          commit('SET_ID', data.user_Id);
          commit('SET_NAME', data.user_name);
          commit('SET_ROLES', data.role);
          commit('SET_EMAIL', data.email);
          resolve(data);
        }).catch(error => {
        reject(error);
      });
    }));
  }


};


export default {
  namespaced: true,
  state,
  mutations,
  actions
};