import { createPinia } from "pinia";
import Vuex from "vuex";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
createApp(App).use(Vuex).use(createPinia()).mount("#app");
