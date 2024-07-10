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
    name: "My recipes",
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
    name: "Shared recipes",
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
    name: "",
    component: FrontPageView,
  },
  {
    path: "/signup",
    name: "Sign up",
    component: SignUpView,
  },
  {
    path: "/addrecipe",
    name: "Add a recipe",
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
    name: "Settings",
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
    name: "About",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash };
    } else {
      return { top: 0 };
    }
  },
});

export default router;
