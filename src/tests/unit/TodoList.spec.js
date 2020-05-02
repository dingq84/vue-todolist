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

  describe("ItemOpenDialog testing", () => {
    let wrapper;
    let todoItem;
    beforeAll(() => {
      store = new Vuex.Store({ modules: { todo: todoStore, project: projectStore } });
      // reset store state todo
      store.state.todo.todos = [];
      store.state.project.projects = [];
      // add two project;
      const projectA = store.getters.emptyProject();
      projectA.name = "project-a";
      store.dispatch("addProject", projectA);
      todoItem = store.getters.emptyTodoItem();
      todoItem.project = projectA.id;
      todoItem.name = "todo-a";
      store.dispatch("addTodoItem", todoItem);
      wrapper = shallowMount(TodoList, { store });
    });

    it("The dialog does not exist default", () => {
      expect(wrapper.find("[data-testId='dialog']").exists()).toBe(false);
    });

    it(`Trigger itemOpenDialog, the dialog should be openned,
    the dialogData should equals todoItem, and the mode equals view`, async () => {
      wrapper.vm.itemOpenDialog(todoItem.id);
      await wrapper.vm.$nextTick();
      expect(wrapper.find("[data-testId='dialog']").exists()).toBe(true);
      expect(wrapper.vm.dialogData).toBe(todoItem);
      expect(wrapper.vm.mode).toBe("view");
    });

    it("Clicking the edit button, the submit button should exist", async () => {
      const editButton = wrapper.find("[data-testId='edit-button']");
      editButton.trigger("click");
      await wrapper.vm.$nextTick();
      expect(wrapper.find("[data-testId='submit-button']").exists()).toBe(true);
    });

    it("Clicking the submit button, the todo item name should update as new-test-name", async () => {
      wrapper.vm.dialogData.name = "new-test-name";
      wrapper.find("[data-testId='submit-button']").trigger("click");
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.currentTodos.find(todo => todo.id === todoItem.id).name).toBe("new-test-name");
    });
  });
});
