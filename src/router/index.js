import Vue from 'vue';
import VueRouter from 'vue-router';

import Layout from '@/layout';
import Test from "@/views/test/Test.vue";

Vue.use(VueRouter);

const routes = [
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
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/form',
    component: Layout,
    meta: {title: 'Form', icon: 'form', roles: ['devops']},
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: {title: 'Form', icon: 'form', roles: ['devops']}
      }
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;
