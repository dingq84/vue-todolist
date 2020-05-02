<template lang="pug">
  .todo-list
    v-hover(v-for='todo in todos' :key='todo.id')
      template(v-slot='{ hover }')
          v-card(:elevation="hover ? 12 : 2")
            TodoItem(:id='todo.id' :name='todo.name' :completed='todo.complete' @updateComplete='updateComplete')
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
      return this.$store.state.todo.todos;
    },
  },
  watch: {},
  methods: {
    updateComplete(id, complete) {
      const endDate = complete ? new Date() : null;
      this.$store.dispatch("editTodoItem", { id, complete, endDate });
    },
  },
};
</script>
