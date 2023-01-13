<template>
  <main>
    <!--heading-->
    <header>
      <img src="./assets/logo.svg" alt="pinia" />
      <h1>{{ stateManager }} tasks</h1>
      <button
        style="margin-left: 10px; margin-top: 20px"
        @click="toggleStateManager"
      >
        Toggle state manager
      </button>
      <button
        style="margin-left: 10px; margin-top: 20px"
        @click="someFunctionality"
      >
        Some Functionality
      </button>
    </header>
    <!--new task form-->
    <TaskForm></TaskForm>
    <!--filter-->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>
    <!--loading-->
    <div v-if="isLoading" class="loading">loading tasks...</div>
    <!--all tasks-->
    <div v-if="filter === 'all'" class="task-list">
      <p>You have {{ taskStore.totalCount }} tasks</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <taskDetails :task="task" />
      </div>
    </div>
    <!--fav tasks-->
    <div v-if="filter === 'favs'" class="task-list">
      <p>You have {{ taskStore.favCount }} favorites</p>
      <div v-for="task in taskStore.favs" :key="task.id">
        <taskDetails :task="task" />
      </div>
    </div>
    <!--<div v-for="task in vuexTaskStore.state.tasks" :key="task.id">
      {{ task.title }} - {{ task.isFav }}
    </div>-->
    <!-- <button class="reset" @click="taskStore.$reset">RESET</button> -->
  </main>
</template>

<script>
import { ref } from "vue";
import taskStore from "./stores/SharedStorage.js";
import taskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";

export default {
  components: {
    TaskForm,
    taskDetails,
  },
  setup() {
    taskStore.init();
    taskStore.actions.getTasks();
    const filter = ref("all");
    return {
      taskStore,
      filter,
    };
  },
  data() {
    return { stateManager: "Pinia" };
  },
  watch: {
    stateManager: {
      handler(newStateManager) {
        window.stateManager = newStateManager;
      },
      immediate: true,
    },
  },
  mounted() {
    //const { tasks, isLoading, favs, totalCount, favCount }
    const tasks = taskStore.state().tasks;
    const isLoading = taskStore.state().isLoading;
    console.log(isLoading);
    const favs = taskStore.getters.favs();
    const totalCount = taskStore.getters.totalCount();
    const favCount = taskStore.getters.favCount();
    return {
      taskStore,
      tasks,
      isLoading,
      favs,
      totalCount,
      favCount,
    };
  },
  methods: {
    toggleStateManager() {
      this.stateManager = this.stateManager === "Pinia" ? "Vuex" : "Pinia";
    },
    someFunctionality() {
      console.log(this.taskStores.state().tasks);
    },
  },
};
</script>
