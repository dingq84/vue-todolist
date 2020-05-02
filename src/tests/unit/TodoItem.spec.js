import { shallowMount, mount } from "@vue/test-utils";

import TodoItem from "@/components/TodoItem";

//IMPORTANT: there are some problems with official Vuetify test setup, so I used another method to set up vuetify for the test environment.

describe("TodoItem.vue", () => {
  it("Should display the name", () => {
    const name = "Todo 1";
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        id: "11",
        name,
        complete: false,
      },
    });

    expect(wrapper.text()).toBe(name);
  });

  describe("Toogle checkbox", () => {
    const mockUpdateComplete = jest.fn();
    const id = "123";
    const complete = false;
    const wrapper = mount(TodoItem, {
      propsData: {
        id: id,
        complete,
        name: "Todo 1",
      },
      listeners: {
        updateComplete: mockUpdateComplete,
      },
    });
    const checkbox = wrapper.find(".my-checkbox").find("input[type=checkbox]");
    checkbox.trigger("click");

    it("The checkbox should be checked", () => {
      expect(checkbox.element.checked).not.toBe(complete);
    });

    it("Clicking the checkbox should emit event to updateComplete", () => {
      expect(mockUpdateComplete).toHaveBeenCalledTimes(1);
    });

    it("UpdateComplete arguments shoule be id", () => {
      expect(mockUpdateComplete).toHaveBeenCalledWith(id, !complete);
    });
  });

  describe("Clicking todoItem", () => {
    const mockOpenDialog = jest.fn();
    const id = "123";
    const wrapper = shallowMount(TodoItem, {
      propsData: {
        id,
        name: "TODO2",
        complete: false,
      },
      listeners: {
        openDialog: mockOpenDialog,
      },
    });

    wrapper.trigger("click");

    it("Should be execute openDialog function when clicking todoItem", () => {
      expect(mockOpenDialog).toHaveBeenCalledTimes(1);
    });

    it("Should pass the id to openDialog function", () => {
      expect(mockOpenDialog).toHaveBeenCalledWith(id);
    });
  });
});
