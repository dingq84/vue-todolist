<template lang="pug">
  div.d-flex.home
    div.green.sidebar
    div.blue.flex-grow-1
      TodoList
</template>

<script>
import TodoList from "@/components/TodoList";
export default {
  name: "Home",
  components: {
    TodoList,
  },
};
</script>

<style scoped>
.home {
  height: 100%;
}
.sidebar {
  width: 400px;
}
</style>
