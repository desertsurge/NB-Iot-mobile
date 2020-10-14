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
    component: () => import('../views/Frequency.vue')
  },
  {
    path: '/power',
    name: 'power',
    component: () => import('../views/Power.vue')
  },
  {
    path: '/grid',
    name: 'grid',
    component: () => import('../views/Grid.vue')
  },
  {
    path: '/nr',
    name: 'nr',
    component: () => import('../views/Nr.vue')
  },
  {
    path: '/nr36',
    name: 'nr36',
    component: () => import('../views/Nr3_6G.vue')
  },
  {
    path: '/gsm',
    name: 'gsm',
    component: () => import('../views/Gsm.vue')
  },
  {
    path: '/umts',
    name: 'umts',
    component: () => import('../views/Umts.vue')
  },
  {
    path: '/Fdd',
    name: 'Fdd',
    component: () => import('../views/Fdd.vue')
  },
  {
    path: '/Tdd',
    name: 'Tdd',
    component: () => import('../views/Tdd.vue')
  },
  {
    path: '/PeakRate',
    name: 'PeakRate',
    component: () => import('../views/Peak-rate.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
