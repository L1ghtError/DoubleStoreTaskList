<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="newTask" type="text" placeholder="I need to.." />
    <button>Add</button>
  </form>
</template>

<script>
import { ref } from "vue";
import taskStore from "../stores/SharedStorage.js";

export default {
  setup() {
    const newTask = ref("");
    const handleSubmit = () => {
      if (newTask.value.length != "") {
        taskStore.actions.addTask({
          title: newTask.value,
          isFav: false,
          id:
            taskStore.state().tasks[taskStore.state().tasks.length - 1].id + 1,
        });
        newTask.value = "";
      }
    };
    return { handleSubmit, newTask };
  },
};
</script>
