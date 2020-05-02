import Vuetify from "vuetify";
import { shallowMount, mount } from "@vue/test-utils";

import DialogProjectItem from "@/components/DialogProjectItem";

describe("DialogProjectItem.vue", () => {
  describe("When mode is create or edit, the submitButton is disabled if the form is not completed", () => {
    it.each(["create", "edit"])("IsDisabled should be true with name is empty, when the mode is %s", mode => {
      const wrapper = shallowMount(DialogProjectItem, {
        propsData: {
          isOpen: true,
          mode,
          id: "123",
        },
      });
      expect(wrapper.vm.isDisabled).toBe(true);
    });

    it.each(["delete", "view"])("IsDisabled should be false when the mode is %s, despite the name is empty", mode => {
      const wrapper = shallowMount(DialogProjectItem, {
        propsData: {
          isOpen: true,
          mode,
          id: "123",
        },
      });
      expect(wrapper.vm.isDisabled).toBe(false);
    });

    it.each(["create", "edit"])("If the name is not empty, the isDisabled should be false in %s mode", mode => {
      const wrapper = shallowMount(DialogProjectItem, {
        propsData: {
          isOpen: true,
          mode,
          id: "123",
          name: "123",
        },
      });
      expect(wrapper.vm.isDisabled).toBe(false);
    });
  });

  describe("Emitting update:isOpen testing", () => {
    const mockUpdateIsOpen = jest.fn();
    const wrapper = shallowMount(DialogProjectItem, {
      propsData: {
        isOpen: true,
        id: "123",
      },
      listeners: {
        "update:isOpen": mockUpdateIsOpen,
      },
    });

    it.each([
      ["ok", 1],
      ["cancel", 2],
    ])("Clicking the %s button should call updateIsOpen function", async (mode, expected) => {
      const button = wrapper.find(`[data-testId=${mode}-button]`);
      button.trigger("click");
      await wrapper.vm.$nextTick();
      expect(mockUpdateIsOpen).toHaveBeenCalledTimes(expected);
      expect(mockUpdateIsOpen).toHaveBeenCalledWith(false);
    });
  });

  describe("Emitting the update:name testing", () => {
    const mockUpdateName = jest.fn();
    const wrapper = mount(DialogProjectItem, {
      vuetify: new Vuetify(),
      propsData: {
        isOpen: true,
        id: "123",
      },
      listeners: {
        "update:name": mockUpdateName,
      },
    });
    wrapper.setMethods("update:name", mockUpdateName);
    it("Updateing the name field should trigger update:name function", async () => {
      const nameInput = wrapper.find("[data-testId='name']");
      nameInput.setValue("123123");
      await wrapper.vm.$nextTick();
      expect(mockUpdateName).toHaveBeenCalledTimes(1);
      expect(mockUpdateName).toHaveBeenCalledWith("123123");
    });
  });

  describe("Error testing", () => {
    beforeAll(() => {
      global.console = {
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        info: jest.fn(),
        debug: jest.fn(),
      };
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("Props error is not empty, it should display waring text", () => {
      const wrapper = shallowMount(DialogProjectItem, { propsData: { isOpen: true, id: "123", error: "test error" } });
      expect(wrapper.find("[data-testId='error']").text()).toBe("test error");
    });

    it("Passing unknown mode, it should throw erorr", () => {
      expect(() => shallowMount(DialogProjectItem, { propsData: { isOpen: true, id: "123", mode: "unknown mode" } })).toThrow();
    });
  });
});
