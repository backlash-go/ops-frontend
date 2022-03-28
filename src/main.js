import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;


//设置全局组件的Svg-Icon
import '@/icons'; // icon

import '@/styles/index.scss'; // global css

import 'normalize.css/normalize.css';


//按需要导入UI 组件
import '@/core/element-ui-use';

//vue-ls
import '@/core/use.js';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


