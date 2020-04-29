<template lang="pug">
  div
    h1 Search
    TodoList
</template>
<script>
import TodoList from "@/components/TodoList";

export default {
  name: "Search",
  components: {
    TodoList,
  },
};
</script>
