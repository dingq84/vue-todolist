<template lang="pug">
  .todo-item(@click.self='openDialog') {{ name }}
    v-checkbox.my-checkbox(:input-value='completed' @change='updateCompleted')
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
    completed: {
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
    updateCompleted() {
      this.$emit("updateComplete", this.id);
    },
    openDialog() {
      this.$emit("openDialog", this.id);
    },
  },
};
</script>
