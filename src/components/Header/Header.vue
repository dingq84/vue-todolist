<template lang="pug">
  v-app-bar(dark dense app fixed height=80)
      h1.font-weight-black.display-1
        | Todo list
      v-spacer
      v-col(md='3')
        v-text-field.searchInput(
          v-model='search'
          prepend-inner-icon='mdi-magnify'
          solo
          placeholder="搜尋名稱或內容"
          hide-details
          @keydown.enter.native='searchTodo'
        )
      v-btn.addBtn(icon @click.native='addTodoItem')
        v-icon
          | mdi-plus
      v-spacer
      DialogTodoItem.dialog(v-if='isOpen' :isOpen='isOpen' mode='create' :item='item')
</template>

<script>
import DialogTodoItem from "@/components/DialogTodoItem";

export default {
  name: "Header",
  components: {
    DialogTodoItem,
  },
  props: {},
  data() {
    return {
      isOpen: false,
      item: {},
      search: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    addTodoItem() {
      this.isOpen = true;
      this.item = this.$store.getters.emptyTodoItem();
    },
    searchTodo() {},
  },
};
</script>
