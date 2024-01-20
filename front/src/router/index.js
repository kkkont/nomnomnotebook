import { createRouter, createWebHashHistory } from 'vue-router'
import MyRecipesView from '../views/MyRecipesView.vue'
import AllRecipesView from '../views/AllRecipesView.vue'
import FrontPageView from '../views/FrontPageView.vue'
import SignUpView from '../views/SignUpView.vue'

const routes = [
  {
    path: '/myrecipes',
    name: 'myrecipes',
    component: MyRecipesView
  },
  {
    path: '/shared',
    name: 'sharedrecipes',
    component: AllRecipesView
  },
  {
    path: '/',
    name: 'frontpage',
    component: FrontPageView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
