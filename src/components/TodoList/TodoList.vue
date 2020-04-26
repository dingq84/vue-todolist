<template lang="pug">
  .todo-list
    TodoItem(v-for='todo in todos' :key='todo.id' :id='todo.id' :name='todo.name' :completed='todo.completed')
</template>

<script>
import TodoItem from "@/components/TodoItem";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
  },
  watch: {},
  methods: {},
};
</script>
