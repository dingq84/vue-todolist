<template lang="pug">
  v-dialog.dialog-todo-item(v-model='_isOpen' width='500')
    v-card
      v-card-title.headline.grey.darken-3(primay-title)
        v-row
          v-col(cols='12' sm='8')
            div.d-flex.align-center.my-2
              v-text-field.headline(:disabled='!isEdit' outlined hide-details dark)
          v-col(cols='12' sm='4' align-self='center')
            //- v-select(:items='' label='專案' dense solo hide-details :disabled='!isEdit')
      v-card-text.d-flex.align-center.justify-space-between.my-2
        div.d-flex.algin-center.my-2
          label.mx-2.subtitle-2.text-no-wrap(:style='{ lineHeight: "38px" }')
            | 優先序
        div.d-flex.align-center.my-2
          label.mx-2.subtitle-2.text-no-wrap 
            | 完成
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
    };
  },
  computed: {
    _isOpen: {
      get() {
        return this.isOpen;
      },
      set() {
        this.$emit("toggleDialog");
      },
    },
  },
  watch: {},
  methods: {},
};
</script>
