import Vuex from "vuex";
import { shallowMount } from "@vue/test-utils";

import { todoStore } from "@/store/todo.store.js";
import DialogTodoItem from "@/components/DialogTodoItem";

describe("DialogTodoItem.vue", () => {
  describe("Emitting update:isOpen testing", () => {
    afterEach(() => {
      mockUpdateIsOpen.mockReset();
    });

    const mockUpdateIsOpen = jest.fn();
    const store = new Vuex.Store({ modules: { todo: todoStore } });
    const emptyTodoItem = store.getters.emptyTodoItem();
    const wrapper = shallowMount(DialogTodoItem, {
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
