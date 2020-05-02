<template lang="pug">
  router-link.link.d-flex.pa-2.ma-2.justify-space-between.align-center(
    :to='`/search?project=${name}`'
    data-testId='link'
  )
    p.mb-0.title.blue-grey--text.text--darken-1(data-testId='name') {{ name }}
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
    },
  },
};
</script>
<style scoped>
.link {
  text-decoration: noen;
}
</style>
