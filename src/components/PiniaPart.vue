<template>
  <div class="new-task-form">
    <TaskForm></TaskForm>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useTaskStore } from "../stores/TaskStore";
import TaskForm from "../components/TaskForm.vue";
export default {
  components: {
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
