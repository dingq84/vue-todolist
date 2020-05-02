<template lang="pug">
  .todo-item.d-flex.align-center.justify-space-between.px-12(@click.self='openDialog')
    p.title.font-weight-bold.mb-0 {{ name }}
    v-checkbox.my-checkbox(:input-value='complete' @change='updateComplete')
</template>

<script>
export default {
  name: "TodoItem",
  components: {},
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    updateComplete() {
      this.$emit("updateComplete", this.id, !this.complete);
    },
    openDialog() {
      this.$emit("openDialog", this.id);
    },
  },
};
</script>
