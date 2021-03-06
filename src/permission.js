import router from './router';
import store from './store';
import Vue from 'vue';


import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

NProgress.configure({showSpinner: false}); // NProgress Configuration

import {ACCESS_TOKEN} from "@/store/mutation-types";


router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const token = Vue.ls.get(ACCESS_TOKEN);
  if (token) {
    if (to.path === '/login') {
      next({path: '/dashboard'});
      NProgress.done();
    } else {
      if (!store.getters.ID) {
        store.dispatch('user/GetInfo').then((response) => {
          const { role } = response
          store.dispatch('permission/generateRoutes', role).then(res => {
            // dynamically add accessible routes
            router.addRoutes(res);
            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({...to, replace: true});
            NProgress.done();
          }).catch(error => console.log(error));

        }).catch(() => {
          store.dispatch('user/logout').then(() => {
            next({path: '/login', query: {redirect: to.fullPath}});
          });
          // console.log(error);
        });
      }
      next();
      NProgress.done();

    }
  } else {
    if (to.path === '/login') {
      next();
      NProgress.done();

    } else {
      next({path: '/login'});
      NProgress.done();

    }

  }

});