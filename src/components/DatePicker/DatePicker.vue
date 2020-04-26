<template lang="pug">
  v-menu(
    v-model='dateMenu'
    :close-on-content-click='false'
    :nudge-right='40'
    transition='scale-transition'
    offset-y
    max-width='290px'
    min-width='290px'
    data-testId='dateInput'
  )
    template(v-slot:activator='{ on }')
      div.d-flex.align-center.my-2
        label.mx-2.subtitle-2.text-no-wrap {{ label }}
        v-text-field(readonly :disabled='!disabled' solo :value='dateVal' v-on='on' hide-details)
    v-date-picker(data-testId='datePicker' locale='en-in' v-model='dateVal' no-title @input='dateMenu = false')
</template>

<script>
//IMPORTANT: https://stackoverflow.com/questions/57524110/what-does-v-on-syntax-mean-in-vuejs
export default {
  name: "DatePicker",
  components: {},
  props: {
    label: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dateMenu: false,
    };
  },
  computed: {
    dateDisp() {
      return this.dateVal;
    },
    dateVal: {
      get() {
        const year = this.date.getFullYear();
        const month = this.date.getMonth() + 1;
        const date = this.date.getDate();
        return `${year}-${month}-${date}`;
      },
      set(value) {
        this.$emit("update:date", new Date(value));
      },
    },
  },
  watch: {},
  methods: {},
};
</script>
