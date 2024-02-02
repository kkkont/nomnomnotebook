import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App.vue";
import router from "./router";
import store from "./store";

library.add(fab);
library.add(fas);

const app = createApp(App);

// Register the component globally
app.component("font-awesome-icon", FontAwesomeIcon);

// Use the router and store plugins
const vueApp = app.use(router).use(store);

// Set up a beforeRouteUpdate guard to update the title on route change
router.beforeEach((to, from, next) => {
  // Update the title based on the route name
  document.title = to.name ? `${to.name} ⏐ NomNomNotebook` : "NomNomNotebook";
  next();
});

// Mount the app to the '#app' element
vueApp.mount("#app");
