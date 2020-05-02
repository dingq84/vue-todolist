<template lang="pug">
  v-app
    Header
    v-content
      div.d-flex.content
        aside.teal.lighten-1.pa-2.sidebar
          SideBar
        div.pa-2.indigo.lighten-2.flex-grow-1
          router-view
</template>

<script>
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default {
  name: "App",
  components: {
    Header,
    SideBar,
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
