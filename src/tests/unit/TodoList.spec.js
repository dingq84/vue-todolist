import Vuex from "vuex";
import { shallowMount } from "@vue/test-utils";

import { todoStore } from "@/store/todo.store.js";
import TodoList from "@/components/TodoList";

describe("TodoList.vue", () => {
  const store = new Vuex.Store({ modules: { todo: todoStore } });
  store.dispatch("addTodoItem", store.getters.emptyTodoItem());
  store.dispatch("addTodoItem", store.getters.emptyTodoItem());
  it("Should be two todoitem", () => {
    const wrapper = shallowMount(TodoList, { store });
    expect(wrapper.findAll({ name: "TodoItem" }).length).toBe(2);
  });

  describe("TodoItem emit the updateComplete event to TodoList", () => {
    it("Both todo item of complete are false", () => {
      const wrapper = shallowMount(TodoList, { store });
      expect(wrapper.vm.todos.filter(todo => !todo.complete)).toHaveLength(2);
    });

    it("Trigger updateComplete to toggle complete", async () => {
      const wrapper = shallowMount(TodoList, { store });
      const todoItem = wrapper.find({ name: "TodoItem" });
      todoItem.vm.$emit("updateComplete", todoItem.vm.id, !todoItem.vm.complete);
      await wrapper.vm.$nextTick();
      const target = wrapper.vm.todos.filter(todo => todo.complete)[0];
      expect(target.id).toBe(todoItem.vm.id);
    });
  });
});