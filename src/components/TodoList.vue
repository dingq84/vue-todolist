<template lang="pug">
  .todo-list
    v-hover(v-for='todo in currentTodos' :key='todo.id')
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
    return {
      todos: this.$store.state.todo.todos,
      currentTodos: this.$store.state.todo.todos,
    };
  },
  computed: {},
  watch: {
    $route(to) {
      const {
        path,
        query: { name, project },
      } = to;
      if (path === "/search") {
        if (name && project) {
          const targetProject = this.$store.state.project.projects.filter(p => p.name === project)[0];
          const result = this.todos.filter(todo => todo.name.indexOf(name) !== -1);
          this.currentTodos = result.filter(todo => todo.project === targetProject.id);
        } else if (name) {
          this.currentTodos = this.todos.filter(todo => todo.name.indexOf(name) !== -1);
        } else {
          const targetProject = this.$store.state.project.projects.filter(p => p.name === project)[0];
          this.currentTodos = this.todos.filter(todo => todo.project === targetProject.id);
        }
      }
    },
  },
  methods: {
    updateComplete(id, complete) {
      const endDate = complete ? new Date() : null;
      this.$store.dispatch("editTodoItem", { id, complete, endDate });
    },
  },
};
</script>
