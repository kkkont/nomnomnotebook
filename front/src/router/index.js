import { createRouter, createWebHashHistory } from "vue-router";
import MyRecipesView from "../views/MyRecipesView.vue";
import AllRecipesView from "../views/AllRecipesView.vue";
import FrontPageView from "../views/FrontPageView.vue";
import SignUpView from "../views/SignUpView.vue";
import AddRecipeView from "../views/AddRecipeView.vue";
import AccountSettingsView from "../views/AccountSettingView.vue";
import EditRecipeView from "../views/EditRecipeView.vue";
import ViewRecipeView from "../views/ViewRecipeView.vue";
import AboutView from "../views/AboutView.vue";
import auth from "../auth";

const routes = [
  {
    path: "/",
    name: "myrecipes",
    component: MyRecipesView,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next("/welcome");
      } else {
        next();
      }
    },
  },
  {
    path: "/shared",
    name: "sharedrecipes",
    component: AllRecipesView,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next("/welcome");
      } else {
        next();
      }
    },
  },
  {
    path: "/welcome",
    name: "frontpage",
    component: FrontPageView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/addrecipe",
    name: "addrecipe",
    component: AddRecipeView,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next("/welcome");
      } else {
        next();
      }
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: AccountSettingsView,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next("/welcome");
      } else {
        next();
      }
    },
  },
  {
    path: "/edit/:recipeId",
    name: "edit",
    component: EditRecipeView,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next("/welcome");
      } else {
        next();
      }
    },
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: ViewRecipeView,
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
        next("/welcome");
      } else {
        next();
      }
    },
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
