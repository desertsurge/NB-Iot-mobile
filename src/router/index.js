import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import isWeixin from '../script/browser'
import Home from '../views/Home.vue'
// const path = require('path')

const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/tive-vue3-vite-demo/' : '/'
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/noAuth',
        name: 'noAuth',
        component: () => import('../views/NoAuth.vue'),
        meta: {
            noAuth: true
        }
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
    },
    {
        path: '/SsbFrequency',
        name: 'SsbFrequency',
        component: () => import('../views/SsbFrequency.vue')
    },
    {
        path: '/riv',
        name: 'Riv',
        component: () => import('../views/Riv.vue')
    }, {
        path: '/random-img',
        name: 'random-img',
        component: defineAsyncComponent(() => import(`../views/randomImg.vue`)),
    },
    {
        path: '/wasm',
        name: 'wasm',
        component: defineAsyncComponent(() => import(`../views/wasm.vue`)),
    },
    {
        path: '/*',
        redirect: '/',
    },
]

const router = createRouter({
    history: createWebHistory(basePath), // 如果是根目录部署请配置为 /
    routes: routes,
})
router.beforeEach((to, from, next) => {
    console.log(to, from)
    if (!isWeixin() && !to.meta.noAuth) {
        next({ path: '/noAuth' })
    } else {
        next()
    }
})
router.afterEach((to, from) => {
    // console.log('afterEach')
})

export default router