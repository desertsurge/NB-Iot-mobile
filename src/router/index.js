import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/frequency',
    name: 'frequency',
    component: () => import(/* webpackChunkName: "about" */ '../views/Frequency.vue')
  },
  {
    path: '/power',
    name: 'power',
    component: () => import(/* webpackChunkName: "about" */ '../views/Power.vue')
  },
  {
    path: '/grid',
    name: 'grid',
    component: () => import(/* webpackChunkName: "about" */ '../views/Grid.vue')
  },
  {
    path: '/nr',
    name: 'nr',
    component: () => import(/* webpackChunkName: "about" */ '../views/Nr.vue')
  },
  {
    path: '/nr36',
    name: 'nr36',
    component: () => import(/* webpackChunkName: "about" */ '../views/Nr3_6G.vue')
  },
  {
    path: '/gsm',
    name: 'gsm',
    component: () => import(/* webpackChunkName: "about" */ '../views/Gsm.vue')
  },
  {
    path: '/umts',
    name: 'umts',
    component: () => import(/* webpackChunkName: "about" */ '../views/Umts.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
