import Vuex from "vuex";
import { shallowMount } from "@vue/test-utils";

import { todoStore } from "@/store/todo.store";
import { projectStore } from "@/store/project.store";
import { priorityStore } from "@/store/priority.store";

import DialogTodoItem from "@/components/DialogTodoItem";

describe("DialogTodoItem.vue", () => {
  const store = new Vuex.Store({ modules: { todo: todoStore, project: projectStore, priority: priorityStore } });
  const emptyTodoItem = store.getters.emptyTodoItem();
  const mountComponent = props =>
    shallowMount(DialogTodoItem, {
      store,
      ...props,
    });
  describe("When mode is create or edit, the submitButton is disabled if the form is not completed", () => {
    it("IsDisabled will be true default", () => {
      const wrapper = shallowMount(DialogTodoItem, {
        store,
        propsData: {
          isOpen: true,
          mode: "create",
          item: emptyTodoItem,
        },
      });
      expect(wrapper.vm.isDisabled).toBe(true);
    });

    it("Completed the form, the isDisabled will be false", () => {
      const wrapper = mountComponent({
        propsData: {
          isOpen: true,
          mode: "create",
          item: Object.keys(emptyTodoItem).reduce(
            (accumulate, current) => ({ ...accumulate, [current]: emptyTodoItem[current] === "" ? "test" : emptyTodoItem[current] }),
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
        item: emptyTodoItem,
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
});
