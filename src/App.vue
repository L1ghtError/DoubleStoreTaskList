<template>
  <main>
    <!--heading-->
    <header>
      <img src="./assets/logo.svg" alt="pinia" />
      <h1>Pinia tasks</h1>
    </header>
    <!--new task form-->
    <div class="new-task-form">
      <TaskForm></TaskForm>
    </div>
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
    <!-- <button class="reset" @click="taskStore.$reset">RESET</button> -->
  </main>
</template>

<script>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useTaskStore } from "./stores/TaskStore";
import taskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
export default {
  components: {
    taskDetails,
    TaskForm,
  },
  setup() {
    const taskStore = useTaskStore();
    const { tasks, isLoading, favs, totalCount, favCount } =
      storeToRefs(taskStore);
    const filter = ref("all");
    taskStore.getTasks();
    return { taskStore, filter, tasks, isLoading, favs, totalCount, favCount };
  },
};
</script>
