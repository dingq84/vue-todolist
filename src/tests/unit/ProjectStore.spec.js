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

  it("Initailize project store", () => {
    store.dispatch("initProject", []);
    expect(store.state.projects).toEqual([]);
  });
  describe("Adding project", () => {
    it("Projects is empty default", () => {
      expect(store.state.projects).toEqual([]);
    });

    const name = "project-a";
    it("Adding project", () => {
      const projectA = store.getters.emptyProject();
      projectA.name = name;
      store.dispatch("addProject", projectA);
      expect(store.state.projects.filter(project => project.name === name)).toHaveLength(1);
    });

    it("Adding duplicated project", () => {
      const projectB = store.getters.emptyProject();
      projectB.name = name;
      expect(() => {
        store.dispatch("addProject", projectB);
      }).toThrow();
      store.dispatch("resetStore");
    });
  });

  describe("Remove project", () => {
    it("There are two project in store", () => {
      const projectA = store.getters.emptyProject();
      projectA.name = "project-a";
      const projectB = store.getters.emptyProject();
      projectB.name = "project-b";
      store.dispatch("addProject", projectA);
      store.dispatch("addProject", projectB);
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
      const projecta = store.getters.emptyProject();
      const projectb = store.getters.emptyProject();
      projecta.name = "project-a";
      projectb.name = "project-b";
      store.dispatch("addProject", projecta);
      store.dispatch("addProject", projectb);
      expect(store.state.projects).toHaveLength(2);
    });

    it("Edit project a to project c", () => {
      const projectA = store.state.projects.filter(project => project.name === "project-a")[0];
      const newProjectA = { id: projectA.id, name: "new-project-a" };
      store.dispatch("editProject", newProjectA);
      expect(store.state.projects).toContain(newProjectA);
      store.dispatch("resetStore");
    });
  });

  describe("Getter testing", () => {
    it("ProjectsOptions should equal [{ value: project.id, text: project.name }, ]", () => {
      const projecta = store.getters.emptyProject();
      const projectb = store.getters.emptyProject();
      projecta.name = "project-a";
      projectb.name = "project-b";
      store.dispatch("addProject", projecta);
      store.dispatch("addProject", projectb);
      const projects = store.state.projects;
      expect(projects.map(project => ({ value: project.id, text: project.name }))).toEqual(store.getters.projectsOptions);
      store.dispatch("resetStore");
    });

    it("EmptyProject shoule equal a empty project object", () => {
      const emptyProject = store.getters.emptyProject();
      expect(emptyProject).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        })
      );
    });
  });
});
