import Vue from "vue";
import Vuex from "vuex";

import { todoStore } from "./todo.store";
import { projectStore } from "./project.store";
import { priorityStore } from "./priority.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todo: todoStore,
    project: projectStore,
    priority: priorityStore,
  },
});
