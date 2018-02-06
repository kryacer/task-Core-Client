import Vue from 'vue'
import Router from 'vue-router'
import store from 'utilities/store'
// Anonymous
import Home from 'components/Home/Home.vue'
import About from 'components/Home/About.vue'
import Contact from 'components/Home/Contact.vue'
// Error
import Error_ from 'components/Error/Error_.vue'
import Error404 from 'components/Error/Error404.vue'
import Error500 from 'components/Error/Error500.vue'
// Account
import Signin from 'components/Account/Signin.vue'
import Signup from 'components/Account/Signup.vue'
import Profile from 'components/Account/Profile.vue'

// Tasks
// eslint-disable-next-line
import Tasks from 'components/Tasks/index.vue'
import TasksTabs from 'components/Tasks/Tabs.vue'
import TasksCreate from 'components/Tasks/Undone/AddTask.vue'
import TasksDetails from 'components/Tasks/Done/Details.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  root: '/',
  
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/welcome',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/signin',
      component: Signin
    },
    {
      path: '/signout'
    },
    
    {
      path: '/profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/error',
      component: Error_,
      children: [
        {
          path: '404',
          component: Error404
        },
        {
          path: '500',
          component: Error500
        }
      ]
    },
    {
      // Tasks
      path: '/tasks',
      component: Tasks,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          component: TasksTabs
        },
        {
          path: 'create',
          component: TasksCreate
        },
        {
          name: 'task-details',
          path: 'details',
          component: TasksDetails
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (store.getters.isAuthenticated) {
    const notValid = ['/signin', '/signup']

    if (notValid.lastIndexOf(to.path) >= 0) {
      next({
        path: '/'
      })
    } else if (to.path === '/signout') {
      store.commit('removeAuthentication')
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    next({
      path: '/signin',
      query: {
        redirect: to.fullPath
      }
    })
  } else if (to.path === '/signout') {
    next({
      path: '/'
    })
  } else {
    next()
  }
})

export default router
