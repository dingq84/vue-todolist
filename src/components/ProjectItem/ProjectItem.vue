<template lang="pug">
  router-link(:to='`/${name}`' data-testId='link')
    p(data-testId='name') {{ name }}
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
  methods: {},
}
</script>

