<template lang="pug">
  .todo-list
    v-hover(v-for='todo in currentTodos' :key='todo.id')
      template(v-slot='{ hover }')
          v-card(:elevation="hover ? 12 : 2")
            TodoItem(
              :id='todo.id'
              :name='todo.name'
              :complete='todo.complete'
              @updateComplete='updateComplete'
              @openDialog='itemOpenDialog'
            )
    DialogTodoItem(
      v-if='isOpen'
      :isOpen.sync='isOpen'
      v-bind.sync='dialogData'
      :mode='mode'
      data-testId='dialog'
    )
      v-btn(v-if='mode === "view"' text @click.native='mode = "edit"' data-testId='edit-button') 編輯
      v-btn(v-else data-testId='submit-button' text @click.native='sumitData') 送出
</template>

<script>
import TodoItem from "@/components/TodoItem";
import DialogTodoItem from "@/components/DialogTodoItem";

export default {
  name: "TodoList",
  components: {
    TodoItem,
    DialogTodoItem,
  },
  props: {},
  data() {
    return {
      todos: this.$store.state.todo.todos,
      currentTodos: this.$store.state.todo.todos,
      dialogData: "",
      isOpen: false,
      mode: "",
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
    itemOpenDialog(id) {
      const targetTodoItem = this.currentTodos.find(todo => todo.id === id);
      this.isOpen = true;
      this.dialogData = targetTodoItem;
      this.mode = "view";
    },
    sumitData() {
      this.$store.dispatch("editTodoItem", this.dialogData);
      this.isOpen = false;
      this.dialogData = "";
      this.mode = "view";
    },
  },
};
</script>
