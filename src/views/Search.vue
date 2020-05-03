<template lang="pug">
  div
    p.display-1.font-weight-bold 搜尋結果
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
