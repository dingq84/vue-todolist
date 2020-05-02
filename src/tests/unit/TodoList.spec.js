import Vuex from "vuex";
import Vuetify from "vuetify";
import { shallowMount, mount } from "@vue/test-utils";

import { todoStore } from "@/store/todo.store.js";
import { projectStore } from "@/store/project.store.js";
import TodoList from "@/components/TodoList";
import router from "@/router";

describe("TodoList.vue", () => {
  let vuetify;
  let store;
  beforeAll(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({ modules: { todo: todoStore } });
    store.dispatch("addTodoItem", store.getters.emptyTodoItem());
    store.dispatch("addTodoItem", store.getters.emptyTodoItem());
  });

  describe("Name of the group", () => {
    it("Should be two todoitem", () => {
      const wrapper = mount(TodoList, { store, vuetify });
      expect(wrapper.findAll({ name: "TodoItem" }).length).toBe(2);
    });
  });

  describe("TodoItem emit the updateComplete event to TodoList", () => {
    it("Both todo item of complete are false", () => {
      const wrapper = shallowMount(TodoList, { store });
      expect(wrapper.vm.todos.filter(todo => !todo.complete)).toHaveLength(2);
    });

    it("Trigger updateComplete to toggle complete", async () => {
      const wrapper = mount(TodoList, { store, vuetify });
      const todoItem = wrapper.find({ name: "TodoItem" });
      todoItem.vm.$emit("updateComplete", todoItem.vm.id, !todoItem.vm.complete);
      await wrapper.vm.$nextTick();
      const target = wrapper.vm.todos.filter(todo => todo.complete)[0];
      expect(target.id).toBe(todoItem.vm.id);
    });
  });

  describe("The todolist shoulb be filter by router qeury parameter", () => {
    let wrapper;
    beforeAll(() => {
      store = new Vuex.Store({ modules: { todo: todoStore, project: projectStore } });
      // reset store state todo
      store.state.todo.todos = [];
      // add two project;
      const projectA = store.getters.emptyProject();
      projectA.name = "project-a";
      store.dispatch("addProject", projectA);
      const projectB = store.getters.emptyProject();
      projectB.name = "project-b";
      store.dispatch("addProject", projectB);
      // add three todo
      const todoA = store.getters.emptyTodoItem();
      todoA.project = projectA.id;
      todoA.name = "todo-a";
      store.dispatch("addTodoItem", todoA);
      const todoB = store.getters.emptyTodoItem();
      todoA.project = projectA.id;
      todoB.name = "todo-b";
      store.dispatch("addTodoItem", todoB);
      const todoC = store.getters.emptyTodoItem();
      todoC.project = projectB.id;
      todoC.name = "todo-a-c";
      store.dispatch("addTodoItem", todoC);
      wrapper = shallowMount(TodoList, { store, router });
    });
    it("It should be three todoitem without any parameter", () => {
      expect(wrapper.vm.currentTodos).toHaveLength(3);
    });

    it('Searching todo item by todo name, the result should contain "-a"', async () => {
      await wrapper.vm.$router.push({ path: "/search", query: { name: "-a" } });
      const todoName = wrapper.vm.currentTodos.map(todo => todo.name);
      expect(wrapper.vm.currentTodos).toHaveLength(2);
      expect(todoName).toEqual(expect.arrayContaining([expect.stringContaining("-a")]));
    });

    it("Searching todo item by project name, the result should contain 'project-b'", async () => {
      await wrapper.vm.$router.push({ path: "/search", query: { project: "project-b" } });
      expect(wrapper.vm.currentTodos).toHaveLength(1);
    });

    it("Searching todo item by todo name and project name, the result should eqauls todoA", async () => {
      await wrapper.vm.$router.push({ path: "/search", query: { name: "-a", project: "project-a" } });
      expect(wrapper.vm.currentTodos).toHaveLength(1);
    });
  });
});
