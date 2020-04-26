import Vue from "vue";
import { v4 as uuidv4 } from "uuid";

export const todoStore = {
  state: {
    todos: [],
  },
  getters: {
    emptyTodoItem() {
      // To keep id is random
      return () => {
        const id = uuidv4();
        return {
          id,
          name: "",
          complete: false,
          startDate: new Date(),
          endDate: null,
          project: "",
          content: "",
          priority: "0",
        };
      };
    },
    // currentTodoList() {},
  },
  mutations: {
    addTodoItem(state, payload) {
      state.todos.push(payload);
    },
    removeTodoItem(state, payload) {
      state.todos = state.todos.filter(todo => todo.id !== payload);
    },
    editTodoItem(state, payload) {
      const index = state.todos.findIndex(todo => todo.id === payload.id);
      const newTodoItem = { ...state.todos[index], ...payload };
      if (newTodoItem.complete !== Boolean(newTodoItem.endDate)) {
        newTodoItem.endDate = newTodoItem.complete ? new Date() : null;
      }
      Vue.set(state.todos, index, newTodoItem);
    },
  },
  actions: {
    addTodoItem(context, todoItem) {
      context.commit("addTodoItem", todoItem);
    },
    removeTodoItem(context, id) {
      context.commit("removeTodoItem", id);
    },
    editTodoItem(context, todoItem) {
      context.commit("editTodoItem", todoItem);
    },
  },
};
