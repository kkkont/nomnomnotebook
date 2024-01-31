import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App.vue";
import router from "./router";
import store from "./store";

library.add(fas);

const app = createApp(App);

// Register the component globally
app.component("font-awesome-icon", FontAwesomeIcon);

// Use the router and store plugins
app.use(router).use(store);

// Mount the app to the '#app' element
app.mount("#app");
