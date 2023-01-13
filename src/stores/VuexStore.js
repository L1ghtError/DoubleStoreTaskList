import Vuex from "vuex";

export const vuexTaskStore = new Vuex.Store({
  state: {
    tasks: [],
    isLoading: false,
  },
  getters: {
    favs(state) {
      return state.tasks.filter((t) => t.isFav);
    },
    favCount(state) {
      return state.tasks.reduce((total, task) => {
        return total + task.isFav;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  actions: {
    async getTasks({ commit }) {
      commit("setLoading", true);
      //db is hoster by npm package "json-server"
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      commit("setTasks", data);
      commit("setLoading", false);
    },
    async addTask({ commit }, task) {
      commit("pushTasks", task);
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      if (res.error) {
        console.log(res.error);
      }
    },
    async deleteTask({ commit }, id) {
      const newTasks = this.state.tasks.filter((t) => {
        return t.id !== id;
      });
      commit("setTasks", newTasks);
      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE",
      });
      if (res.error) {
        console.log(res.error);
      }
    },
    async toggleFav({ commit }, id) {
      const task = this.state.tasks.find((t) => t.id === id);
      const tempNumberForTaskIsFav = !task.isFav;
      //console.log(this.state.tasks[tempNumberForTaskId].id);
      commit("setFavoriteTask", { id, tempNumberForTaskIsFav });
      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "PATCH",
        body: JSON.stringify({ isFav: tempNumberForTaskIsFav }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.error) {
        console.log(res.error);
      }
    },
  },
  mutations: {
    setFavoriteTask: (state, responseObject) => {
      const task = state.tasks.find((t) => t.id === responseObject.id);
      task.isFav = responseObject.tempNumberForTaskIsFav;
    },
    setTasks: (state, todo) => (state.tasks = todo),
    pushTasks: (state, todo) => state.tasks.push(todo),
    setLoading: (state, isLoadingParam) => (state.isLoading = isLoadingParam),
  },
});
