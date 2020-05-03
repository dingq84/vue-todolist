import Vuex from "vuex";

import { todoStore } from "@/store/todo.store";

describe("Todo store", () => {
  const { actions, mutations } = todoStore;
  const store = new Vuex.Store({
    ...todoStore,
    actions: {
      ...actions,
      resetStore(context) {
        context.commit("resetStore");
      },
    },
    mutations: {
      ...mutations,
      resetStore(state) {
        state.todos = [];
      },
    },
  });

  it("Initialize store", () => {
    store.dispatch("initTodoItem", []);
    expect(store.state.todos).toEqual([]);
  });

  describe("Adding todo item", () => {
    it("Todolist is empty default", () => {
      expect(store.state.todos).toEqual([]);
    });

    it("Add one todo itme ", () => {
      const emptyTodoItem = store.getters.emptyTodoItem();
      store.dispatch("addTodoItem", emptyTodoItem);
      expect(store.state.todos).toEqual([emptyTodoItem]);
      store.dispatch("resetStore");
    });
  });

  describe("Remove todo item", () => {
    const target = store.getters.emptyTodoItem();
    it("There are three todo items", () => {
      store.dispatch("addTodoItem", target);
      store.dispatch("addTodoItem", store.getters.emptyTodoItem());
      store.dispatch("addTodoItem", store.getters.emptyTodoItem());
      expect(store.state.todos).toHaveLength(3);
    });
    it("Target should be deleted", () => {
      store.dispatch("removeTodoItem", target.id);
      const currentTodos = store.state.todos;
      expect(currentTodos).toHaveLength(2);
      expect(currentTodos).not.toContain(target);
      store.dispatch("resetStore");
    });
  });

  describe("Edit todo item", () => {
    const target = store.getters.emptyTodoItem();
    it("There are one todo items", () => {
      store.dispatch("addTodoItem", target);
      expect(store.state.todos).toHaveLength(1);
    });

    it("Target should be updated", () => {
      target.name = "updated";
      store.dispatch("editTodoItem", target);
      expect(store.state.todos[0]).toMatchObject(target);
    });

    it("Toggle complete prop should update the endDate prop", () => {
      expect(target.endDate).toBeNull();
      target.complete = true;
      store.dispatch("editTodoItem", target);
      expect(store.state.todos[0]).not.toBeNull();
    });
  });
});
