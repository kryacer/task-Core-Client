import Vue from 'vue'
import Vuex from 'vuex'

import settingsModule from './settings'
import userModule from './user'
import tasksModule from './tasks'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: userModule,
    settings: settingsModule,
    tasks: tasksModule,
  }
})

export default store
