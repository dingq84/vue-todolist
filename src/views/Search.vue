<template lang="pug">
  div
    p.display-1.font-weight-bold {{ title }}
    TodoList
</template>
<script>
import TodoList from "@/components/TodoList";

export default {
  name: "Search",
  data() {
    return {
      title: "",
    };
  },
  components: {
    TodoList,
  },
  watch: {
    $route(to) {
      const {
        query: { name, project },
      } = to;
      this.renderTitle(name, project);
    },
  },
  mounted() {
    const { name, project } = this.$route.query;
    this.renderTitle(name, project);
  },
  methods: {
    renderTitle(name, project) {
      if (name && project) {
        this.title = `專案 ${project} 下含有${name}名稱的 TodoItem`;
      } else if (name) {
        this.title = `含有${name}名稱的 TodoItem`;
      } else if (project) {
        this.title = `專案 ${project} 下所有的 TodoItem`;
      } else {
        this.title = "全部的 TodoItem ";
      }
    },
  },
};
</script>
