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
          @keydown.enter.native='(event) => search && searchTodo(event)'
        )
      v-btn.addBtn(icon @click.native='openDialog')
        v-icon
          | mdi-plus
      v-spacer
      DialogTodoItem.dialog(v-if='isOpen' :isOpen.sync='isOpen' v-bind.sync='item' mode='create')
        template(v-slot='{ isDisabled }')
          v-btn(color='primary' text @click='addTodoItem' :disabled='isDisabled') 新增
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
    openDialog() {
      this.isOpen = true;
      this.item = this.$store.getters.emptyTodoItem();
    },
    searchTodo() {
      this.$router.push({ path: "/search", query: { name: this.search } });
    },
    addTodoItem() {
      console.log(this.item);
      // this.$store.
    },
  },
};
</script>
