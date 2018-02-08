import Vue from 'vue'
import Vuex from 'vuex'

import userModule from './user'
import tasksModule from './tasks'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: userModule,
    tasks: tasksModule,
  }
})

export default store
