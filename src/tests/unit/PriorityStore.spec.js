import Vuex from "vuex";
import { priorityStore } from "@/store/priority.store.js";

describe("Priority store", () => {
  const { actions, mutations } = priorityStore;
  const store = new Vuex.Store({
    ...priorityStore,
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
    actions: {
      ...actions,
      resetStore(context) {
        context.commit("resetStore");
      },
    },
    mutations: {
      ...mutations,
      resetStore(state) {
        state.projects = [];
      },
    },
  });

  it("There are three level of priority", () => {
    expect(store.state.priority).toHaveLength(3);
  });

  it("displayPriority should be the names", () => {
    expect(store.getters.displayPriority).toEqual(["普通", "優先", "重要"]);
  });

  it("priorityOptions should be [{value, text}]", () => {
    expect(store.getters.priorityOptions).toEqual([
      { value: "0", text: "普通" },
      { value: "1", text: "優先" },
      { value: "2", text: "重要" },
    ]);
  });
});
