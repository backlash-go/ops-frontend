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
      {
        path: 'user-test',
        component: () => import('@/views/test/Test.vue'),
        meta: {title: 'test', icon: 'user', roles: ['admin']}
      },

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
    path: '/form',
    component: Layout,
    meta: {title: 'Form', icon: 'form', roles: ['devops']},
    children: [
      {
        path: 'index',
        name: 'Form1',
        component: () => import('@/views/form/index'),
        meta: {title: 'Form1', icon: 'form', roles: ['devops']}
      },
      {
        path: 'index2',
        name: 'Form2',
        component: () => import('@/views/form/index2'),
        meta: {title: 'Form2', icon: 'form', roles: ['devops']}
      }
    ]
  },
  {
    path: '/form2',
    component: Layout,
    meta: {title: 'Form2', icon: 'form', roles: ['RD']},
    children: [
      {
        path: 'index2',
        name: 'Form21',
        component: () => import('@/views/form/index'),
        meta: {title: 'Form', icon: 'form', roles: ['RD']}
      }
    ]
  },
];


const router = new VueRouter({
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
});

export default router;
