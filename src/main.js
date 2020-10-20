import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import 'normalize.css/normalize.css'

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
