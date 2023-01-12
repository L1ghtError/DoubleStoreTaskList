<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="newTask" type="text" placeholder="I need to.." />
    <button>Add</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "../stores/TaskStore";

export default {
  setup() {
    const taskStore = useTaskStore();
    const newTask = ref("");
    const handleSubmit = () => {
      if (newTask.value.length != "") {
        taskStore.addTask({
          title: newTask.value,
          isFav: false,
          id: taskStore.tasks[taskStore.tasks.length - 1].id + 1,
        });
        newTask.value = "";
      }
    };
    return { handleSubmit, newTask };
  },
};
</script>
