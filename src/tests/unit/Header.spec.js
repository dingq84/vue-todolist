import Vuex from "vuex";
import { shallowMount } from "@vue/test-utils";

import { todoStore } from "@/store/todo.store.js";
import Header from "@/components/Header";

describe("Header.vue", () => {
  const store = new Vuex.Store({ modules: { todo: todoStore } });
  describe("Adding todo item", () => {
    const wrapper = shallowMount(Header, { store });
    const addingBtn = wrapper.find(".addBtn");
    addingBtn.trigger("click");
    wrapper.vm.$nextTick();
    it("Clicking the adding button should open dialog", () => {
      const dialog = wrapper.find(".dialog");
      expect(dialog.exists()).toBe(true);
    });

    it("After clicking th adding button, the item should not be empty ", () => {
      expect(wrapper.vm.item).not.toEqual({});
    });
  });

  describe("Searching todo item", () => {
    const mockSearchFunction = jest.fn();
    const wrapper = shallowMount(Header, { store });
    wrapper.setMethods({ searchTodo: mockSearchFunction });
    const searchInput = wrapper.find(".searchInput");
    it("Pressing enter should trigger search function", async () => {
      searchInput.trigger("keydown.enter");
      await wrapper.vm.$nextTick();
      expect(mockSearchFunction).toHaveBeenCalledTimes(1);
    });
  });
});
