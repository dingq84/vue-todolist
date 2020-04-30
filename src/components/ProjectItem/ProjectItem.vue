<template lang="pug">
  router-link(:to='`/search?project=${name}`' data-testId='link')
    p(data-testId='name') {{ name }}
    v-btn(icon @click='openDialog' data-testId='openDialog')
      v-icon mdi-pencil-outline
</template>

<script>
export default {
  name: "ProjectItem",
  components: {},
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    openDialog() {
      this.$emit("openDialog", this.$props);
      // this.isOpen = true;
    },
  },
};
</script>
