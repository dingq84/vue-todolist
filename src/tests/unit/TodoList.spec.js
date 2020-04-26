import { shallowMount } from "@vue/test-utils";

import { todoStore } from "@/store/todo.store.js";
import TodoList from "@/components/TodoList";

describe("TodoList.vue", () => {
  const { emptyTodoItem } = todoStore.getters;
  it("The number of todolist should be two", () => {
    const wrapper = shallowMount(TodoList, {
      mocks: {
        $store: {
          state: {
            todos: [emptyTodoItem()(), emptyTodoItem()()],
          },
        },
      },
    });
    expect(wrapper.vm.todos).toHaveLength(2);
  });
});
