<template lang="pug">
  v-app
    Header
    v-content
      div.d-flex.content
        aside.teal.lighten-1.pa-2.sidebar
          SideBar
        div.pa-2.light-blue.darken-2.flex-grow-1
          router-view
</template>

<script>
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { getAllTodoItem, getAllProject } from "@/services";

export default {
  name: "App",
  components: {
    Header,
    SideBar,
  },
  async created() {
    const todoItemDataPromise = getAllTodoItem();
    const projectDataPromise = getAllProject();
    const [todoItemData, projectData] = await Promise.all([todoItemDataPromise, projectDataPromise]);
    this.$store.dispatch("initTodoItem", Object.values(todoItemData));
    this.$store.dispatch("initProject", Object.values(projectData));
  },
  data: () => ({}),
  methods: {},
};
</script>

<style scoped>
.content {
  height: calc(100vh - 80px);
  overflow: hidden;
}
.sidebar {
  width: 350px;
  height: 100%;
  overflow: auto;
}
</style>
