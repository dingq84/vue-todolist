<template lang="pug">
  div
    h2.font-weight-bold.headline(data-testId='title') 專案列表
    v-divider.mt-2.mb-4
    div.projectList
      v-hover(v-for='(project, index) in projects' :key='project.id')
        template(v-slot='{ hover }')
          v-card.teal.accent-1(:elevation="hover ? 12 : 2")
            ProjectItem(
              :name='project.name'
              :id='project.id'
              @openDialog='itemOpenDialog'
            )
    v-btn.blue.darken-2(width='100%' data-testId='openDialog' @click='openDialog')
      v-icon.white--text mdi-plus
    DialogProjectItem(
      v-if='isOpen'
      :mode='mode'
      :isOpen.sync='isOpen'
      v-bind.sync='dialogData'
      data-testId='dialog'
      :error='error'
    )
      template(v-slot='{ isDisabled }')
        v-btn(
          v-if='mode === "create"'
          @click='addProjectItem'
          :disabled='isDisabled'
          data-testId='adding-button'
          color='primary' 
          text
        )  新增
        v-btn(
          v-else
          @click='editProjectItem'
          :disabled='isDisabled'
          data-testId='editting-button'
          color='primary'
          text
        ) 編輯
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
      error: "",
    };
  },
  computed: {
    projects() {
      return this.$store.state.project.projects;
    },
  },
  watch: {
    isOpen() {
      this.error = "";
    },
  },
  methods: {
    itemOpenDialog(project) {
      this.isOpen = true;
      this.mode = "edit";
      this.dialogData = { ...project };
    },
    openDialog() {
      this.isOpen = true;
      this.dialogData = this.$store.getters.emptyProject();
      this.mode = "create";
    },
    addProjectItem() {
      try {
        this.$store.dispatch("addProject", this.dialogData);
        this.dialogData = "";
        this.isOpen = false;
      } catch (error) {
        console.log(error);
        this.error = "專案名稱已存在";
      }
    },
    editProjectItem() {
      try {
        this.$store.dispatch("editProject", this.dialogData);
        this.dialogData = "";
        this.isOpen = false;
      } catch (error) {
        console.log(error);
        this.error = "專案名稱已存在";
      }
    },
  },
};
</script>
<style scoped>
.projectList {
  overflow: auto;
  height: 100%;
}
</style>
