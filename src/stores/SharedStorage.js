import { useTaskStore } from "./TaskStore";
import { vuexTaskStore } from "./VuexStore.js";

let piniaTaskStore;

const sharedTaskStore = {
  init() {
    piniaTaskStore = useTaskStore();
  },
  state() {
    if (window.stateManager == "Pinia") {
      return piniaTaskStore; //.$state
    }
    if (window.stateManager == "Vuex") {
      return vuexTaskStore.state; //
    }
  },
  getters: {
    favs() {
      if (window.stateManager == "Pinia") {
        return piniaTaskStore.favs;
      }
      if (window.stateManager == "Vuex") {
        return vuexTaskStore.getters.favs;
      }
    },
    favCount() {
      if (window.stateManager == "Pinia") {
        return piniaTaskStore.favCount;
      }
      if (window.stateManager == "Vuex") {
        return vuexTaskStore.getters.favCount;
      }
    },
    totalCount() {
      if (window.stateManager == "Pinia") {
        return piniaTaskStore.totalCount;
      }
      if (window.stateManager == "Vuex") {
        return vuexTaskStore.getters.totalCount;
      }
    },
  },
  actions: {
    async getTasks() {
      if (window.stateManager == "Pinia" || window.stateManager == undefined) {
        piniaTaskStore.getTasks();
      }
      if (window.stateManager == "Vuex") {
        vuexTaskStore.dispatch("getTasks");
      }
    },
    async addTask(task) {
      if (window.stateManager == "Pinia") {
        piniaTaskStore.addTask(task);
      }
      if (window.stateManager == "Vuex") {
        vuexTaskStore.dispatch("addTask", task);
      }
    },
    async deleteTask(id) {
      if (window.stateManager == "Pinia") {
        piniaTaskStore.deleteTask(id);
      }
      if (window.stateManager == "Vuex") {
        vuexTaskStore.dispatch("deleteTask", id);
      }
    },
    async toggleFav(id) {
      if (window.stateManager == "Pinia") {
        piniaTaskStore.toggleFav(id);
      }
      if (window.stateManager == "Vuex") {
        vuexTaskStore.dispatch("toggleFav", id);
      }
    },
  },
};
export default sharedTaskStore;
