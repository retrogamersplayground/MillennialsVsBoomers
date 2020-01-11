import Vue from 'vue';
import Router from 'vue-router';
import App from '../App';
// import Home from '@/components/Home'
import Home from '@/mozzey/Home';
// import Millennial from "@/components/Millennial";
// import Boomer from "@/components/Boomer";
import Player from '@/mozzey/Player';
import Game from '@/components/Game';
import Navigation from '@/components/Navigation';
import Login from '@/components/Login';
import Register from '@/components/Register';
import ResetPassword from '@/components/ResetPassword';
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Navigation',
      name: 'Navigation',
      component: Navigation
    },
    {
      path: '/',
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
      path: '/:teamName/:teamId',
      name: 'Player',
      component: Player,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: "/Millennial/:teamId",
    //   name: "Millennial",
    //   component: Millennial,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: "/Boomer/:teamId2",
    //   name: "Boomer",
    //   component: Boomer,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/Game/:lobbyId',
      name: 'Game',
      component: Game,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

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
      });
    } else {
      // Proceed to route
      next();
    }
    // eslint-disable-next-line
  } else if (record => record.meta.requiresGuest) {
    // Check if logged in
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/Home',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});
export default router;
