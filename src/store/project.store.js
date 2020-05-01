import Vue from "vue";
import { v4 as uuidv4 } from "uuid";

export const projectStore = {
  state: {
    projects: [],
  },
  getters: {
    projectsOptions(state) {
      return state.projects.map(project => ({ value: project.id, text: project.name }));
    },
    emptyProject() {
      return () => ({
        id: uuidv4(),
        name: "",
      });
    },
  },
  mutations: {
    addProject(state, payload) {
      state.projects.push(payload);
    },
    removeProject(state, payload) {
      state.projects = state.projects.filter(project => project.id !== payload);
    },
    editProject(state, payload) {
      const index = state.projects.findIndex(project => project.id === payload.id);
      Vue.set(state.projects, index, payload);
    },
  },
  actions: {
    addProject(context, projectName) {
      const filterProject = context.state.projects.filter(project => project.name === projectName);
      if (filterProject.length !== 0) {
        throw new Error(`Project name ${projectName} is existed`);
      } else {
        context.commit("addProject", projectName);
      }
    },
    removeProject(context, projectId) {
      context.commit("removeProject", projectId);
    },
    editProject(context, project) {
      context.commit("editProject", project);
    },
  },
};
