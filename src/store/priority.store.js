export const priorityStore = {
  state: {
    priority: [
      {
        level: "0",
        color: "#ccc",
        name: "普通",
      },
      {
        level: "1",
        color: "#efaa32",
        name: "優先",
      },
      {
        level: "2",
        color: "#f00",
        name: "重要",
      },
    ],
  },
  getters: {
    displayPriority(state) {
      return state.priority.map(priority => priority.name);
    },
    priorityOptions(state) {
      return state.priority.map(priority => ({ value: priority.level, text: priority.name }));
    },
  },
  mutations: {},
  actions: {},
};
