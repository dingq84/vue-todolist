<template lang="pug">
  v-dialog(v-model='_isOpen' width='500')
    v-card
      v-card-title.headline.grey.darken-3(primary-title) {{ title }}
      v-card-text.d-flex.align-center.my-2
        label.mx-2.subtitle-2.text-no-wrap 專案名稱
        v-text-field(
          :value='name'
          @input='(value) => { $emit("update:name", value) }'
          data-testId='name'
          outlined 
          hide-details
        )
      p.ma-0.text-center.subtitle-1.red--text(v-if='error' data-testId='error') {{ error }}
      v-divider
      v-card-actions
        v-spacer
        v-btn(@click.native='_isOpen = false' text data-testId='cancel-button') 取消
        slot(:isDisabled='isDisabled')
          v-btn(@click.native='_isOpen = false' color='primary' text data-testId='ok-button') 確定
</template>

<script>
export default {
  name: "DialogProjectItem",
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    mode: {
      type: String,
      default: "view",
      validator(value) {
        return ["create", "delete", "edit", "view"].includes(value);
      },
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    title() {
      switch (this.mode) {
        case "create":
          return "新增專案";
        case "edit":
          return "編輯專案";
        case "view":
          return "瀏覽專案";
        case "delete":
          return "刪除專案";
        default:
          throw new Error(`unknown mode ${this.mode}`);
      }
    },
    _isOpen: {
      get() {
        return this.isOpen;
      },
      set(val) {
        this.$emit("update:isOpen", val);
      },
    },
    isDisabled() {
      return ["create", "edit"].includes(this.mode) && this.name === "";
    },
  },
  watch: {},
  methods: {},
};
</script>
