<template lang="pug">
  .todo-list
    p.ml-4.title.font-weight-normal(v-if='currentTodos.length === 0') 沒有符合的待辦事項
    v-hover.my-4.mx-2(v-for='todo in currentTodos' :key='todo.id')
      template(v-slot='{ hover }')
          v-card.indigo.accent-4(:elevation="hover ? 12 : 2")
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
      v-btn(v-if='mode === "view"' color='primary' text @click.native='mode = "edit"' data-testId='edit-button') 編輯
      v-btn(v-else data-testId='submit-button' color='primary' text @click.native='sumitData') 送出
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
      currentTodos: this.$store.state.todo.todos,
      dialogData: "",
      isOpen: false,
      mode: "",
    };
  },
  computed: {
    todos() {
      return this.$store.state.todo.todos;
    },
  },
  watch: {
    todos(data) {
      this.currentTodos = data;
    },
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
