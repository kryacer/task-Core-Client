import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import App from 'components/App.vue'
import router from 'utilities/router'
import store from 'utilities/store'
import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)
sync(store, router)
// Vue.filter('snippet',(value) => value.slice(0,100))
const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
