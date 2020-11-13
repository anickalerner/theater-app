import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/main.scss'
import PortalVue from 'portal-vue'
// import BookingPopup from '@/components/BookingPopup';

Vue.use(PortalVue);
// Vue.component('BookingPopup', BookingPopup)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
