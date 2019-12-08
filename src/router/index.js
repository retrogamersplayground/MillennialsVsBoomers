import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Millennial from '@/components/Millennial'
import Boomer from '@/components/Boomer'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Millennial',
      name: 'Millennial',
      component: Millennial
    },
    {
      path: '/Boomer',
      name: 'Boomer',
      component: Boomer
    },
    {
      path: '/Game',
      name: 'Game',
      component: Game
    }
  ]
})
