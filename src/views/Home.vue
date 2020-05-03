<template lang="pug">
  div
    p.display-1.font-weight-bold 待辦事項
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
