import Vuex from "vuex";
import { projectStore } from "@/store/project.store.js";

describe("Project stroe", () => {
  const { actions, mutations } = projectStore;
  const store = new Vuex.Store({
    ...projectStore,
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

  describe("Adding project", () => {
    it("Projects is empty default", () => {
      expect(store.state.projects).toEqual([]);
    });

    const name = "project-a";
    it("Adding project", () => {
      store.dispatch("addProject", name);
      expect(store.state.projects.filter(project => project.name === name)).toHaveLength(1);
    });

    it("Adding duplicated project", () => {
      expect(() => {
        store.dispatch("addProject", name);
      }).toThrow();
      store.dispatch("resetStore");
    });
  });

  describe("Remove project", () => {
    it("There are two project in store", () => {
      store.dispatch("addProject", "project-a");
      store.dispatch("addProject", "project-b");
      expect(store.state.projects).toHaveLength(2);
    });

    it("Remove one project", () => {
      const target = store.state.projects[0];
      store.dispatch("removeProject", target.id);
      expect(store.state.projects).not.toContain(target);
      store.dispatch("resetStore");
    });
  });

  describe("Edit project", () => {
    it("There are two project in store", () => {
      store.dispatch("addProject", "project-a");
      store.dispatch("addProject", "project-b");
      expect(store.state.projects).toHaveLength(2);
    });

    it("Edit project a to project c", () => {
      const projectA = store.state.projects.filter(project => project.name === "project-a")[0];
      const newProjectA = { id: projectA.id, name: "new-project-a" };
      store.dispatch("editProject", newProjectA);
      expect(store.state.projects).toContain(newProjectA);
    });
  });
});
