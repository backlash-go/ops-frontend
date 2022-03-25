import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'

Vue.use(VueRouter)

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
    path: '/form',
    component: Layout,
    meta: {title: 'Form', icon: 'form', roles: ['ops']},
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: {title: 'Form', icon: 'form', roles: ['ops']}
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
