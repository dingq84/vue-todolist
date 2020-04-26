<template lang="pug">
  .todo-item(@click.self='openDialog') {{ name }}
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
      default: false,
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
