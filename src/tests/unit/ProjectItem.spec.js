import ProjectItem from "@/components/ProjectItem";
import { shallowMount } from "@vue/test-utils";

describe("ProjectItem.vue", () => {
  describe("ProjectItem dom render", () => {
    const name = "project-a";
    const id = "test-id";
    const wrapper = shallowMount(ProjectItem, {
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
    const wrapper = shallowMount(ProjectItem, {
      propsData: {
        name: "123123",
        id: "12412",
      },
      mocks: {
        $route: {
          path: "/some/path",
        },
      },
    });
    it.todo("test router change");
  });
});
