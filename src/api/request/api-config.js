import axios from 'axios';


import store from "@/store";


const service = axios.create(
  {
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 5000
  }
);


service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = store.getters.token;
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
      this.$message({
        message: '登陆超时，需要重新登陆',
        type: 'error',
        offset: 200,
        onClose: () => {
          console.log("cloase");
        }
      });
    }
  }
);

export default service;
