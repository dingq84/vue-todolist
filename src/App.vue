<template lang="pug">
  v-app
    Header
    v-content
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
