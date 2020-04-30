<template lang="pug">
  v-dialog.dialog-todo-item(v-model='_isOpen' width='500')
    v-card
      v-card-title.headline.grey.darken-3(primay-title)
        v-row
          v-col(cols='12' sm='8')
            div.d-flex.align-center.my-2
              v-text-field.headline(
                data-testId='name' 
                :value='name' 
                @input='(value) => { $emit("update:name", value) }' 
                :disabled='!isEdit' 
                outlined 
                hide-details 
                dark
              )
          v-col(cols='12' sm='4' align-self='center')
            v-select(
              :items='projectsOptions' 
              :value='project'
              @input='(value) => { $emit("update:project", value) }'
              :disabled='!isEdit'
              data-testId='project' 
              label='專案'
              dense 
              solo
              hide-details 
            )
      v-card-text.d-flex.align-center.justify-space-between.my-2
        div.d-flex.algin-center.my-2
          label.mx-2.subtitle-2.text-no-wrap(:style='{ lineHeight: "38px" }') 優先序
          v-select(
            :items='priorityOptions'
            :value='priority'
            @input='(value) => { $emit("update:priority", value) }'
            :disabled='!isEdit'
            data-testId='priority'
            hide-details
            dense 
            solo
          )
        div.d-flex.align-center.my-2
          label.mx-2.subtitle-2.text-no-wrap 完成
          v-checkbox(
            :checked='complete'
            @change='(value) => { $emit("update:complete", value) }'
            :disabled='!isEdit'
            data-testId='complete'
            hide-details
            solo
          )
      v-card-text.d-flex.align-center.justify-space-between.my-2
        DatePicker(
          :date='startDate' 
          @update:date='(value) => { $emit("update:startDate", value) }'
          :disabled='!isEdit'
          label='起始'
        )
        DatePicker(
          v-if='endDate'
          :date='endDate'
          :disabled='!isEdit'
          @update:date='(value) => { $emit("update:endDate", value) }'
          label='完成'
        )
      v-card-text.d-flex.align-center.my-2
        label.mx-2.subtitle-2.text-no-wrap 內容
        v-textarea(
          :value='content'
          @input='(value) => { $emit("update:content", value) }'
          :disabled='!isEdit'
          data-testId='content'
          solo
          no-resize
          counter
        )
      v-divider
      v-card-actions
        v-spacer
        v-btn(text @click.native='_isOpen = false' data-testId='cancel') 取消
        slot(:isDisabled='isDisabled')
          v-btn(@click.native='_isOpen = false' color='primary' text data-testId='ok') 確定
</template>

<script>
import { mapGetters } from "vuex";
import DatePicker from "@/components/DatePicker";

export default {
  name: "DialogTodoItem",
  components: {
    DatePicker,
  },
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
    name: {
      type: String,
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    endDate: {
      required: true,
      validator: value => value instanceof Date || value === null,
    },
    complete: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isEdit: ["create", "edit"].includes(this.mode),
    };
  },
  computed: {
    ...mapGetters(["priorityOptions", "projectsOptions"]),
    _isOpen: {
      get() {
        return this.isOpen;
      },
      set(val) {
        this.$emit("update:isOpen", val);
      },
    },
    isDisabled() {
      return Object.values(this.$props).some(props => !["isOpen", "mode"].includes(props) && props === "");
    },
  },
};
</script>
<style scoped>
.v-input--selection-controls {
  margin-top: 0px;
  padding-top: 0px;
}
</style>
