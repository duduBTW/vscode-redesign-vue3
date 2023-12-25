import { createApp } from "vue";
import "./index.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";

createApp(App).use(createPinia()).use(VueQueryPlugin).mount("#app");
