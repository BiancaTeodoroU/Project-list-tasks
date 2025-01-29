import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router'
import HomePage from './home/Home.vue'
import PanelUser from './panel/Panel.vue'

const routes = [
  {
    path: '/',
    redirect: '/account',
  },
  {
    path: '/account',
    component: HomePage,
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      const userLogged = localStorage.getItem('userLogged')
      if (userLogged) {
        next('/painel')
      } else {
        next()
      }
    },
  },
  {
    path: '/painel',
    component: PanelUser,
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      const userLogged = localStorage.getItem('userLogged')
      if (userLogged) {
        next()
      } else {
        next('/account')
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
