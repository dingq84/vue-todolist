<template lang="pug">
  v-app
    Header
    v-content
      div.d-flex.content
        div.green.sidebar
        div.blue.flex-grow-1
          router-view
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
  data: () => ({}),
  methods: {},
};
</script>

<style scoped>
.content {
  height: 100%;
}
.sidebar {
  width: 350px;
}
</style>
