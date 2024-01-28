import { createRouter, createWebHashHistory } from 'vue-router'
import MyRecipesView from '../views/MyRecipesView.vue'
import AllRecipesView from '../views/AllRecipesView.vue'
import FrontPageView from '../views/FrontPageView.vue'
import SignUpView from '../views/SignUpView.vue'
import AddRecipeView from '../views/AddRecipeView.vue'
import AccountSettingsView from '../views/AccountSettingView.vue'
import EditRecipeView from '../views/EditRecipeView.vue'
import auth from "../auth";

const routes = [
  {
    path: '/',
    name: 'myrecipes',
    component: MyRecipesView,
    beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
          next('/welcome')
      } else {
          next();
      }
  }
  },
  {
    path: '/shared',
    name: 'sharedrecipes',
    component: AllRecipesView
  },
  {
    path: '/welcome',
    name: 'frontpage',
    component: FrontPageView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path:'/addrecipe',
    name:'addrecipe',
    component:AddRecipeView
  },
  {
    path:'/settings',
    name:'settings',
    component:AccountSettingsView
  },
  {
    path:'/edit/:recipeId',
    name:'edit',
    component:EditRecipeView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
