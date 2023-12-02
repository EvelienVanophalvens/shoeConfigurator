import { createRouter, createWebHistory } from 'vue-router'
import ShoeSize from './components/ShoeSize.vue'
import Choose from './components/Choose.vue'

const routes = [
  { path: '/', component: Choose },
  { path: '/Shoesize', component: ShoeSize},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router