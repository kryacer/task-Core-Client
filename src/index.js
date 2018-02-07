import 'utilities/pollyfills'
import 'utilities/vue-material'
import 'utilities/veeValidate'

import 'utilities/cxlt-vue2-toastr'

/* eslint-disable */
import 'utilities/axios'
//import 'components/_custom'
/* eslint-enable */

import 'utilities/vue-mixins'

import 'assets/script/site'

import 'assets/css/icon.css'
import 'assets/css/animations.css'
// import 'assets/css/site.css'

import { app } from './app'

module.exports = function debounce (fn, delay) {
    let timeoutID = null
    return (()=> {
      clearTimeout(timeoutID)
      const args = []
      const that = this
      timeoutID = setTimeout(() => {
        fn.apply(that, args)
      }, delay)
    })
  }
app.$mount('#app')
