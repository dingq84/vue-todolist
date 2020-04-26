<template lang="pug">
  v-dialog.dialog-todo-item(v-model='_isOpen' width='500')
    v-card
      v-card-title.headline.grey.darken-3(primay-title)
        v-row
          v-col(cols='12' sm='8')
            div.d-flex.align-center.my-2
              v-text-field.headline(v-model='todoItem.name' :disabled='!isEdit' outlined hide-details dark)
          v-col(cols='12' sm='4' align-self='center')
            //- v-select(:items='' label='專案' dense solo hide-details :disabled='!isEdit')
      v-card-text.d-flex.align-center.justify-space-between.my-2
        div.d-flex.algin-center.my-2
          label.mx-2.subtitle-2.text-no-wrap(:style='{ lineHeight: "38px" }') 優先序
        div.d-flex.align-center.my-2
          label.mx-2.subtitle-2.text-no-wrap 完成
          v-checkbox(v-model='todoItem.completed' hide-details solo :disabled='!isEdit')
      v-card-text.d-flex.align-center.justify-space-between.my-2
      v-card-text.d-flex.align-center.my-2
        label.mx-2.subtitle-2.text-no-wrap 內容
        v-textarea(v-model='todoItem.context' solo no-resize counter :disabled='!isEdit')
      v-divider
      v-card-actions
        v-spacer
        v-btn(text @click.native='_isOpen = false' data-testId='cancel') 取消
        slot(:isDisabled='isDisabled')
          v-btn(color='primary' text @click.native='_isOpen = false' data-testId='ok') 確定
</template>

<script>
export default {
  name: "DialogTodoItem",
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: "view",
      validator(value) {
        return ["create", "delete", "edit", "view"].includes(value);
      },
    },
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdit: ["create", "edit"].includes(this.mode),
      todoItem: { ...this.item },
    };
  },
  computed: {
    _isOpen: {
      get() {
        return this.isOpen;
      },
      set() {
        this.$emit("update:isOpen", !this.isOpen);
      },
    },
    isDisabled() {
      return true;
    },
  },
  watch: {},
  methods: {},
};
</script>
<style scoped>
.v-input--selection-controls {
  margin-top: 0px;
  padding-top: 0px;
}
</style>
