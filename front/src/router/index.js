import { createRouter, createWebHashHistory } from 'vue-router'
import MyRecipesView from '../views/MyRecipesView.vue'
import AllRecipesView from '../views/AllRecipesView.vue'
const routes = [
  {
    path: '/',
    name: 'myrecipes',
    component: MyRecipesView
  },
  {
    path: '/shared',
    name: 'sharedrecipes',
    component: AllRecipesView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
