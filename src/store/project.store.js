import Vue from "vue";
import { v4 as uuidv4 } from "uuid";

import * as Service from "@/services";

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
    initProject(state, payload) {
      state.projects = payload;
    },
    addProject(state, payload) {
      state.projects.push(payload);
      Service.addProject({ key: payload.id, data: payload });
    },
    removeProject(state, payload) {
      state.projects = state.projects.filter(project => project.id !== payload);
      Service.removeProject(payload);
    },
    editProject(state, payload) {
      const index = state.projects.findIndex(project => project.id === payload.id);
      Service.updateProject({ key: payload.id, data: payload });
      Vue.set(state.projects, index, payload);
    },
  },
  actions: {
    initProject(context, projects) {
      context.commit("initProject", projects);
    },
    addProject(context, project) {
      const filterProject = context.state.projects.filter(originalProject => originalProject.name === project.name);
      if (filterProject.length !== 0) {
        throw new Error(`Project name ${project} is existed`);
      } else {
        context.commit("addProject", project);
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
