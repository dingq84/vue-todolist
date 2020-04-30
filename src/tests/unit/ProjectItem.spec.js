import { shallowMount, mount } from "@vue/test-utils";

import ProjectItem from "@/components/ProjectItem";
import router from "@/router";

describe("ProjectItem.vue", () => {
  describe("ProjectItem dom render", () => {
    const name = "project-a";
    const id = "test-id";
    const wrapper = shallowMount(ProjectItem, {
      router,
      propsData: {
        name,
        id,
      },
    });
    it("It should contain name text", () => {
      expect(wrapper.find('[data-testId="name"]').text()).toContain(name);
    });

    it("The a tag href attribute should equal name", () => {
      expect(wrapper.find("[data-testId='link']").attributes().to).toContain(name);
    });
  });

  describe("Click ProjectItem testing", () => {
    const wrapper = mount(ProjectItem, {
      router,
      propsData: {
        name: "123123",
        id: "12412",
      },
    });

    it("Clicking the project item should change route", async () => {
      const link = wrapper.find("[data-testId='link']");
      link.trigger("click");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$route.path).toBe("/search");
      expect(wrapper.vm.$route.query.project).toBe("123123");
    });
  });

  describe("Edit the project name", () => {
    const mockOpenDialog = jest.fn();
    const mockProject = { id: "12412", name: "123123" };
    const wrapper = mount(ProjectItem, {
      router,
      propsData: mockProject,
      listeners: {
        openDialog: mockOpenDialog,
      },
    });

    it("Clicking edit button should emit event to parent", () => {
      const editButton = wrapper.find("[data-testId='openDialog']");
      editButton.trigger("click");
      expect(mockOpenDialog).toHaveBeenCalledTimes(1);
      expect(mockOpenDialog).toHaveBeenCalledWith(mockProject);
    });
  });
});
