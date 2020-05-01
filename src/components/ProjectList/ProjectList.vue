<template lang="pug">
  div
    h1(data-testId='title') 專案列表
    ProjectItem(
      v-for='project in projects'
      :key='project.id'
      :name='project.name'
      :id='project.id'
      @openDialog='itemOpenDialog'
    )
    v-btn(data-testId='openDialog' @click='openDialog')
      v-icon mdi-plus
    DialogProjectItem(
      v-if='isOpen'
      :mode='mode'
      :isOpen.sync='isOpen'
      v-bind.sync='dialogData'
      data-testId='dialog'
    )
      template(v-slot='{ isDisabled }')
        v-btn(
          @click='addProjectItem'
          :disabled='isDisabled'
          data-testId='adding-button'
          color='primary' 
          text
        )  新增
</template>

<script>
import ProjectItem from "@/components/ProjectItem";
import DialogProjectItem from "@/components/DialogProjectItem";

export default {
  name: "ProjectList",
  components: {
    ProjectItem,
    DialogProjectItem,
  },
  props: {},
  data() {
    return {
      isOpen: false,
      mode: "",
      dialogData: {},
    };
  },
  computed: {
    projects() {
      return this.$store.state.project.projects;
    },
  },
  watch: {},
  methods: {
    itemOpenDialog(project) {
      this.isOpen = true;
      this.mode = "edit";
      this.dialogData = project;
    },
    openDialog() {
      this.isOpen = true;
      this.dialogData = this.$store.getters.emptyProject();
      this.mode = "create";
    },
    addProjectItem() {
      this.$store.dispatch("addProject", this.dialogData);
      this.dialogData = "";
      this.isOpen = false;
    },
  },
};
</script>
