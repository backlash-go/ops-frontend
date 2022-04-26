import axios from 'axios';


import store from "@/store";


import {Message} from 'element-ui';
import {ACCESS_TOKEN} from "@/store/mutation-types.js";
import Vue from 'vue';


const service = axios.create(
  {
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 5000
  }
);


service.interceptors.request.use(
  config => {

    const token = Vue.ls.get(ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


service.interceptors.response.use(
  response => {
    const res = response.data;
    const message = response.data.msg;
    const code = response.data.code;
    if (code === 20000) {
      return response.data;
    } else if (code === 40003) {
      Message({
        message: message,
        type: "warning",
        offset: 100,
        duration: 2800,
        onClose: () => {
          store.dispatch('user/logout')
            .then(() => {
              window.location.reload()
            })
        }
      });
    } else if (code >= 30001 && code <= 30020) {
      Message({
        message: message,
        type: "warning",
        offset: 100,
        duration: 2800,
      });
      return Promise.reject({...response, message});
    }
  }
);


export default service

