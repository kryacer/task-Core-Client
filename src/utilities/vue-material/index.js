import Vue from 'vue'

   // import 'vue-material/dist/theme/default-dark.css' // This line here
   import VueMaterial from 'vue-material'
   import 'vue-material/dist/vue-material.css'
   // import 'vue-material/dist/theme/default-dark.css' // This line here
   
   Vue.use(VueMaterial)
 // import {mdWhiteframeMdTable, MdCard, MdContent, MdRipple, MdEmptyState} from '/vue-material'

// import 'vue-material/dist/vue-material.min.css'

//  Vue.use(MdTable)
//  Vue.use(MdCard)
//  Vue.use(MdContent)
//  Vue.use(MdRipple)
//  Vue.use(MdEmptyState)

  // Vue.use(VueMaterial)

Vue.material.registerTheme({
  default: {
    primary: 'red',
    accent: 'blue',  
    warn: 'red',
    background: 'white'
  },
  invert: {
    primary: 'pink',
    accent: 'indigo'
  },
  'theme-danger': {
    primary: 'red'
  },
  'theme-warn': {
    primary: 'deep-orange'
  },
  'theme-normal': {
    primary: 'orange'
  },
  'theme-primary': {
    primary: 'lime'
  },
  'theme-success': {
    primary: 'green'
  }
})
