import Vue from 'vue';
import VueRouter from 'vue-router';

import Layout from '@/layout';
import Test from "@/views/test/Test.vue";

Vue.use(VueRouter);


export const arr = [1, 2, 3, 4];

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    hidden: true

  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {title: 'Dashboard', icon: 'dashboard'}
      },
    ]
  },
  // {
  //   path: '/test',
  //   name: 'Test',
  //   component: Test,
  //   meta: {title: 'Test', icon: 'Test', roles: ['devops']},
  // },
];


export const asyncRoutes = [
  {
    path: '/personnel-organization',
    component: Layout,
    meta: {title: '人员组织', icon: 'eye', roles: ['admin']},
    children: [
      {
        path: 'user-management',
        component: () => import('@/views/personnel-organization/user-management/index.vue'),
        meta: {title: '用户管理', icon: 'user', roles: ['admin']}
      },
      // {
      //   path: 'user-test',
      //   component: () => import('@/views/test/Test.vue'),
      //   meta: {title: 'test', icon: 'user', roles: ['admin']}
      // },

    ]
  },
  {
    path: '/password',
    component: Layout,
    children: [
      {
        path: 'modify',
        name: 'modify',
        component: () => import('@/views/modifyPass/index.vue'),
        meta: {title: '密码修改', icon: 'password', roles: ['guest']}
      }
    ]
  },
  {
    path: '/power-management',
    component: Layout,
    meta: {title: '权限管理', icon: 'tree', roles: ['devops', 'admin']},
    children: [
      {
        path: 'Interface',
        name: 'Interface',
        component: () => import('@/views/power-management/index.vue'),
        meta: {title: '接口管理', icon: 'form', roles: ['devops', 'admin']}
      },
    ]
  },
];


const router = new VueRouter({
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
});

export default router;
