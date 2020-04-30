import Vuex from "vuex";
import vuetify from "vuetify";
import { shallowMount, mount } from "@vue/test-utils";

import { todoStore } from "@/store/todo.store";
import { projectStore } from "@/store/project.store";
import { priorityStore } from "@/store/priority.store";

import DialogTodoItem from "@/components/DialogTodoItem";

const store = new Vuex.Store({ modules: { todo: todoStore, project: projectStore, priority: priorityStore } });
const emptyTodoItem = store.getters.emptyTodoItem();
const mountComponent = props => shallowMount(DialogTodoItem, { store, ...props });

describe("DialogTodoItem.vue", () => {
  describe("When mode is create or edit, the submitButton is disabled if the form is not completed", () => {
    it("IsDisabled will be true default", () => {
      const wrapper = mountComponent({
        propsData: {
          isOpen: true,
          mode: "create",
          ...emptyTodoItem,
        },
      });
      expect(wrapper.vm.isDisabled).toBe(true);
    });

    it("Completed the form, the isDisabled will be false", () => {
      const wrapper = mountComponent({
        propsData: {
          isOpen: true,
          mode: "create",
          ...Object.keys(emptyTodoItem).reduce(
            (accumulate, current) => ({
              ...accumulate,
              [current]: emptyTodoItem[current] === "" ? "test" : emptyTodoItem[current],
            }),
            {}
          ),
        },
      });
      expect(wrapper.vm.isDisabled).toBe(false);
    });
  });

  describe("Emitting update:isOpen testing", () => {
    afterEach(() => {
      mockUpdateIsOpen.mockReset();
    });

    const mockUpdateIsOpen = jest.fn();
    const wrapper = mountComponent({
      propsData: {
        isOpen: true,
        ...emptyTodoItem,
      },
      listeners: {
        "update:isOpen": mockUpdateIsOpen,
      },
    });
    it("Clicking the cancel button should call updateIsOpen function", async () => {
      const cancelBtn = wrapper.find('[data-testId="cancel"]');
      cancelBtn.trigger("click");
      await wrapper.vm.$nextTick();
      expect(mockUpdateIsOpen).toHaveBeenCalledTimes(1);
      expect(mockUpdateIsOpen).toHaveBeenCalledWith(false);
    });

    it("Clicking the ok button should call updateIsOpen function ", async () => {
      const okBtn = wrapper.find('[data-testId="ok"]');
      okBtn.trigger("click");
      await wrapper.vm.$nextTick();
      expect(mockUpdateIsOpen).toHaveBeenCalledTimes(1);
      expect(mockUpdateIsOpen).toHaveBeenCalledWith(false);
    });
  });

  describe("Editting the filed testing", () => {
    let wrapper = "";
    const mockUpdateName = jest.fn();
    const mockUpdateComplete = jest.fn();
    const mockUpdateContent = jest.fn();
    const mockUpdatePriority = jest.fn();
    const mockUpdateProject = jest.fn();
    const mockUpdateStartDate = jest.fn();
    const mockUpdateEndDate = jest.fn();

    beforeAll(() => {
      // const app = document.createElement("div");
      // app.setAttribute("data-app", true);
      // document.body.append(app);

      wrapper = mount(DialogTodoItem, {
        store,
        vuetify: new vuetify(),
        propsData: {
          isOpen: true,
          mode: "create",
          ...emptyTodoItem,
        },
        listeners: {
          "update:name": mockUpdateName,
          "update:complete": mockUpdateComplete,
          "update:content": mockUpdateContent,
          "update:priority": mockUpdatePriority,
          "update:project": mockUpdateProject,
          "update:startDate": mockUpdateStartDate,
          "update:endDate": mockUpdateEndDate,
        },
      });
    });

    it("Updating name field should call updateName ", async () => {
      const input = wrapper.find("[data-testId='name'");
      input.setValue("hello");
      await wrapper.vm.$nextTick();
      expect(mockUpdateName).toHaveBeenCalledTimes(1);
      expect(mockUpdateName).toHaveBeenCalledWith("hello");
    });

    it("Updating complete field should call updateComplete", async () => {
      const checkbox = wrapper.find("[data-testId='complete']");
      checkbox.setChecked(true);
      await wrapper.vm.$nextTick();
      expect(mockUpdateComplete).toHaveBeenCalledTimes(1);
      expect(mockUpdateComplete).toHaveBeenCalledWith(true);
    });

    it("Updating content field should call updateContent", async () => {
      const textarea = wrapper.find("[data-testId='content']");
      textarea.setValue("hello world");
      await wrapper.vm.$nextTick();
      expect(mockUpdateContent).toHaveBeenCalledTimes(1);
      expect(mockUpdateContent).toHaveBeenCalledWith("hello world");
    });

    it("Updating priority field should call updatePriority", async () => {
      const prioritySelect = wrapper.find("[data-testId='priority']");
      prioritySelect.setValue("2");
      await wrapper.vm.$nextTick();
      expect(mockUpdatePriority).toHaveBeenCalledTimes(1);
      expect(mockUpdatePriority).toHaveBeenCalledWith("2");
    });

    it("Updating project field should call updateProject", async () => {
      const projectSelect = wrapper.find("[data-testId='project']");
      projectSelect.setValue("test");
      await wrapper.vm.$nextTick();
      expect(mockUpdateProject).toHaveBeenCalledTimes(1);
      expect(mockUpdateProject).toHaveBeenCalledWith("test");
    });

    it("Emitting the update:startDate event should call updateStartDate", async () => {
      const date = new Date();
      wrapper.vm.$emit("update:startDate", date);
      await wrapper.vm.$nextTick();
      expect(mockUpdateStartDate).toHaveBeenCalledWith(date);
      expect(mockUpdateStartDate).toHaveBeenCalledTimes(1);
    });

    it("Emitting the update:endDate event should call updateEndDate", async () => {
      const date = new Date();
      wrapper.vm.$emit("update:endDate", date);
      await wrapper.vm.$nextTick();
      expect(mockUpdateEndDate).toHaveBeenCalledWith(date);
      expect(mockUpdateEndDate).toHaveBeenCalledTimes(1);
    });
  });
});
