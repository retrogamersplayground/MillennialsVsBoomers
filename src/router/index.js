import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Millennial from '@/components/Millennial'
import Boomer from '@/components/Boomer'
import Game from '@/components/Game'
import Navigation from '@/components/Navigation'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ResetPassword from '@/components/ResetPassword'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/Navigation',
      name: 'Navigation',
      component: Navigation
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/reset',
      name: 'reset',
      component: ResetPassword,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/Millennial',
      name: 'Millennial',
      component: Millennial,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Boomer',
      name: 'Boomer',
      component: Boomer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Game',
      name: 'Game',
      component: Game,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// Nav Guards
router.beforeEach((to, from, next) => {
  // Check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NOT logged in
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next()
    }
    // eslint-disable-next-line
  } else if (record => record.meta.requiresGuest) {
    // Check if logged in
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/Millennial',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next()
    }
  } else {
    // Proceed to route
    next()
  }
})
export default router
