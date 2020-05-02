<template lang="pug">
  div.sideBar
    ProjectList
</template>

<script>
import ProjectList from "@/components/ProjectList";

export default {
  name: "SideBar",
  components: {
    ProjectList,
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>
<style scoped>
.sideBar {
  height: 100%;
  overflow: auto;
}
</style>
