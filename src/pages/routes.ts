import { createRouter, createWebHistory } from 'vue-router'
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
  },
  {
    path: '/painel',
    component: PanelUser,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
