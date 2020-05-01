import Vuex from "vuex";
import Vuetify from "vuetify";
import { shallowMount, mount } from "@vue/test-utils";

import ProjectList from "@/components/ProjectList";
import { projectStore } from "@/store/project.store.js";
import router from "@/router";

const vuetify = new Vuetify();
const store = new Vuex.Store({ modules: { project: projectStore } });

describe("ProjectList.vue", () => {
  describe("Open dialog project", () => {
    const wrapper = mount(ProjectList, {
      store,
      vuetify,
      router,
    });
    beforeAll(async () => {
      const openDialog = wrapper.find("[data-testId='openDialog']");
      openDialog.trigger("click");
      await wrapper.vm.$nextTick();
    });

    it("Clicking the adding button should open dialog", () => {
      const dialog = wrapper.find("[data-testId='dialog']");
      expect(dialog.exists()).toBe(true);
    });

    it("DialogData should not be empty after clicking the adding button", () => {
      expect(wrapper.vm.dialogData).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        })
      );
    });

    it("Mode should be create after clicking the adding button", () => {
      expect(wrapper.vm.mode).toBe("create");
    });
  });

  describe.only("Adding project to store", () => {
    let wrapper;
    beforeAll(async () => {
      wrapper = mount(ProjectList, {
        store,
        vuetify,
        router,
      });
      const openDialog = wrapper.find("[data-testId='openDialog']");
      openDialog.trigger("click");
      await wrapper.vm.$nextTick();
    });

    it("The adding button should be disabled without completeing project form", () => {
      const addingButton = wrapper.find("[data-testId='adding-button']");
      expect(addingButton.vm.disabled).toBe(true);
    });

    it("After finishing the form, the adding button should be not disabled", async () => {
      const dialog = wrapper.find("[data-testId='dialog']");
      dialog.vm.$emit("update:name", "test");
      await wrapper.vm.$nextTick();
      const addingButton = wrapper.find("[data-testId='adding-button']");
      expect(addingButton.vm.disabled).toBe(false);
    });

    it("After clicking the add button, the store should be added", async () => {
      expect(wrapper.vm.projects).toHaveLength(0);
      const addingButton = wrapper.find("[data-testId='adding-button']");
      addingButton.trigger("click");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.projects).toHaveLength(1);
    });
  });

  describe("Initial ProjectList", () => {
    const wrapper = mount(ProjectList, {
      store,
      vuetify,
      router,
    });
    it("Title should contain 專案", () => {
      const title = wrapper.find("[data-testId='title']");
      expect(title.text()).toContain("專案");
    });

    it("The number of ProjectItem should equal the number of the project in store", () => {
      const projectItem = wrapper.findAll({ name: "ProjectItem" });
      expect(projectItem.length).toBe(wrapper.vm.projects.length);
    });

    it("ProjectList should catch the event from ProjectItem", async () => {
      const mockOpenDialog = jest.spyOn(wrapper.vm, "itemOpenDialog");
      wrapper.setMethods({ itemOpenDialog: mockOpenDialog });
      const projectItem = wrapper.find({ name: "ProjectItem" });
      const openDialogButton = projectItem.find("[data-testId='openDialog']");
      openDialogButton.trigger("click");
      await wrapper.vm.$nextTick();
      expect(mockOpenDialog).toHaveBeenCalledWith(wrapper.vm.projects[0]);
    });
  });

  describe("itemOpenDialog method testing", () => {
    const wrapper = shallowMount(ProjectList, { store });
    const mockOpenDialog = jest.spyOn(wrapper.vm, "itemOpenDialog");
    wrapper.setMethods({ itemOpenDialog: mockOpenDialog });

    it("Dialog is not existed by default", () => {
      const dialog = wrapper.find("[data-testId='dialog']");
      expect(dialog.exists()).toBe(false);
    });

    it("Method itemOpenDialog will open dialog", async () => {
      wrapper.vm.itemOpenDialog({ id: "13", name: "test" });
      await wrapper.vm.$nextTick();
      const dialog = wrapper.find("[data-testId='dialog']");
      expect(dialog.exists()).toBe(true);
    });

    it("Mode should be edit", () => {
      expect(wrapper.vm.mode).toBe("edit");
    });
  });
});
