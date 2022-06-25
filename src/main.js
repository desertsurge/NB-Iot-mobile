import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'

import { Button, Dialog, Icon,
    Divider, Tab, Tabs, Toast, Notify, Tabbar, TabbarItem,
    Image as VanImage, Lazyload, Loading   } from 'vant'
import App from './App.vue'

import 'lib-flexible'
import 'vant/lib/index.css'
import './assets/css/style.scss'

const app = createApp(App)
app.config.globalProperties.$axios = axios

app.use(Button).use(Dialog).use(Icon)
    .use(Divider).use(Tab).use(Tabs)
    .use(Toast).use(Notify).use(Tabbar).use(TabbarItem)
    .use(VanImage).use(Lazyload).use(Loading)
app.use(router).use(store)

app.mount('#app')
