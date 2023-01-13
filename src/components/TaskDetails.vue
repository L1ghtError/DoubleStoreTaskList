<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i class="material-icons" @click="taskStore.actions.deleteTask(task.id)"
        >delete</i
      >
      <i
        class="material-icons"
        :class="{ active: task.isFav }"
        @click="taskStore.actions.toggleFav(task.id)"
        >favorite</i
      >
    </div>
  </div>
</template>
<script>
import taskStore from "../stores/SharedStorage.js";

export default {
  props: {
    task: {
      type: Object,
      default() {
        return { id: 0, title: "error", isFav: false };
      },
    },
  },
  setup() {
    return { taskStore };
  },
};
</script>
