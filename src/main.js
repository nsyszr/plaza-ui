import Vue from 'vue'
import axios from './plugins/axios'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

new Vue({
  vuetify,
  axios,
  store,
  router,
  render: h => h(App)
}).$mount('#app')