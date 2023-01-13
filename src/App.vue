<template>
  <main>
    <!--heading-->
    <header>
      <Transition name="bounceLogo" mode="out-in">
        <img
          v-if="stateManager === 'Pinia'"
          src="./assets/pinia-logo.svg"
          alt="Vue logo"
          class="logo"
        />
        <img
          v-else-if="stateManager === 'Vuex'"
          src="./assets/vuex-logo.svg"
          alt="Vue logo"
          class="logo"
        />
      </Transition>
      <h1>{{ stateManager }} tasks</h1>
      <button
        style="margin-left: 10px; margin-top: 20px"
        @click="toggleStateManager"
      >
        Toggle state manager
      </button>
    </header>
    <!--new task form-->
    <TaskForm></TaskForm>
    <!--filter-->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>
    <!--all tasks-->
    <div v-if="filter === 'all'" class="task-list">
      <p>You have {{ taskStore.getters.totalCount() }} tasks</p>
      <div v-for="task in taskStore.state().tasks" :key="task.id">
        <taskDetails :task="task" />
      </div>
    </div>
    <!--fav tasks-->
    <div v-if="filter === 'favs'" class="task-list">
      <p>You have {{ taskStore.getters.favCount() }} favorites</p>
      <div v-for="task in taskStore.getters.favs()" :key="task.id">
        <taskDetails :task="task" />
      </div>
    </div>
    <!--loading-->
    <div v-if="taskStore.state().isLoading" class="loading">
      loading tasks...
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
        this.changeAppTheme();
        taskStore.actions.getTasks();
      },
      immediate: true,
    },
  },
  methods: {
    toggleStateManager() {
      this.stateManager = this.stateManager === "Pinia" ? "Vuex" : "Pinia";
    },
    changeAppTheme() {
      const stylesheet = document.styleSheets[2];
      const boxParaRule = [...stylesheet.cssRules].find(
        (r) => r.selectorText === ":root"
      );
      const piniaTheme = `--main-color: #ffd859; --first-additional-color: #ffe9a0;`;
      const vuexTheme = `--main-color: #2da968; --first-additional-color: '#6bb290';`;
      boxParaRule.style =
        this.stateManager === "Pinia" ? piniaTheme : vuexTheme;
    },
    someFunctionality() {
      console.log(taskStore.state());
    },
  },
};
</script>
<style scoped>
.bounceLogo-enter-active {
  animation: bounce-in 0.3s;
}
.bounceLogo-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    transform: rotate(-10deg);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
    transform: rotate(0deg);
  }
}
</style>
