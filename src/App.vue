<template lang="pug">
  v-app(dark)
    v-content
      v-container
        DialogTodoItem(:isOpen='isOpen' @toggleDialog='toggleDialog' :item='{}')
        v-btn(@click='toggleDialog')
          | click
</template>

<script>
import TodoItem from "./components/TodoItem";
import DialogTodoItem from "@/components/DialogTodoItem";

export default {
  name: "App",

  components: {
    TodoItem,
    DialogTodoItem,
  },

  data: () => ({
    //
    isOpen: true,
  }),
  methods: {
    toggleDialog() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
