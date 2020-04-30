import Vuex from "vuex";
import Vuetify from "vuetify";
import { shallowMount, mount } from "@vue/test-utils";

import { todoStore } from "@/store/todo.store.js";
import { priorityStore } from "@/store/priority.store.js";
import { projectStore } from "@/store/project.store.js";

import Header from "@/components/Header";

const store = new Vuex.Store({ modules: { todo: todoStore, priority: priorityStore, project: projectStore } });

describe("Header.vue", () => {
  describe("Adding todo item", () => {
    let wrapper;
    beforeAll(() => {
      const vuetify = new Vuetify();
      wrapper = mount(Header, {
        store,
        vuetify,
        scopedSlots: {
          default: "<p>{{props.isDisabled}}</p>",
        },
      });
      const addingBtn = wrapper.find(".addBtn");
      addingBtn.trigger("click");
      wrapper.vm.$nextTick();
    });

    it("Clicking the adding button should open dialog", () => {
      const dialog = wrapper.find(".dialog");
      expect(dialog.exists()).toBe(true);
    });

    it("After clicking th adding button, the item should not be empty ", () => {
      expect(wrapper.vm.item).not.toEqual({});
    });

    it("Clicking the addTodoItem to adding todo item to store", () => {
      const okButton = wrapper.find("[data-testId='ok-button']");
      okButton.vm.$emit("click");
      expect(wrapper.vm.$store.state.todo.todos).toHaveLength(1);
    });

    it("After clicking the ok button, dialog should be not existed", () => {
      const dialog = wrapper.find(".dialog");
      expect(dialog.exists()).not.toBe(true);
    });
  });

  describe("Searching todo item", () => {
    const mockRouterPush = jest.fn();
    const wrapper = shallowMount(Header, {
      store,
      mocks: {
        $router: {
          push: mockRouterPush,
        },
      },
    });
    const mockSearchFunction = jest.spyOn(wrapper.vm, "searchTodo");
    const searchInput = wrapper.find(".searchInput");
    it("Should not trigger search function with not entering anything", async () => {
      searchInput.trigger("keydown.enter");
      await wrapper.vm.$nextTick();
      expect(mockSearchFunction).not.toBeCalled();
    });

    it("Pressing enter should trigger search function", async () => {
      wrapper.vm.search = "test";
      searchInput.trigger("keydown.enter");
      await wrapper.vm.$nextTick();
      expect(mockSearchFunction).toHaveBeenCalledTimes(1);
    });

    it("Router should push to search url ", () => {
      expect(mockRouterPush).toHaveBeenCalledWith({ path: "/search", query: { name: "test" } });
    });
  });
});
