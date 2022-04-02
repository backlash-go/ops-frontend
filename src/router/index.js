import Vue from 'vue';
import VueRouter from 'vue-router';

import Layout from '@/layout';
import Test from "@/views/test/Test.vue";

Vue.use(VueRouter);


export const arr = [1,2,3,4]

export const constantRoutes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {title: 'Dashboard', icon: 'dashboard'}
      },
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
    meta: {title: 'Form2', icon: 'form', roles: ['devops']},
    children: [
      {
        path: 'index2',
        name: 'Form21',
        component: () => import('@/views/form/index'),
        meta: {title: 'Form', icon: 'form', roles: ['devops']}
      }
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    meta: {title: 'Test', icon: 'Test', roles: ['devops']},
  },
];

const router = new VueRouter({
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
});

export default router;
