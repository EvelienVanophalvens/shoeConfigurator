import { createRouter, createWebHistory } from 'vue-router'
import ShoeSize from './components/ShoeSize.vue'
import Choose from './components/Choose.vue'
import UserInfo from './components/UserInfo.vue'

const routes = [
  { path: '/', component: Choose },
  { path: '/Shoesize', component: ShoeSize},
  { path: '/info', component: UserInfo},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router