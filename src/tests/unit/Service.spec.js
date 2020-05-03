import * as Service from "@/services";

describe("Services testing", () => {
  describe("Operating todoitem services", () => {
    const todoItem = { id: "123", name: "test" };
    it("Adding one record, the localforage should have it ", async () => {
      Service.addTodoItem({ key: todoItem.id, data: todoItem });
      const data = await Service.getAllTodoItem();
      expect(Object.values(data)).toEqual([todoItem]);
    });

    it("Update the record, the localforage should be updated", async () => {
      const newTodoItem = { id: todoItem.id, name: "updateD name" };
      Service.updateTodoItem({ key: newTodoItem.id, data: newTodoItem });
      const data = await Service.getAllTodoItem();
      expect(Object.values(data)).toEqual([newTodoItem]);
    });

    it("Remove the record, the localforage should be updated", async () => {
      Service.removeTodoItem(todoItem.id);
      const data = await Service.getAllTodoItem();
      expect(Object.values(data)).toHaveLength(0);
    });
  });
  describe("Operating project item services", () => {
    const projectItem = { id: "123", name: "test" };
    it("Adding one record, the localforage should have it ", async () => {
      Service.addProject({ key: projectItem.id, data: projectItem });
      const data = await Service.getAllProject();
      expect(Object.values(data)).toEqual([projectItem]);
    });

    it("Update the record, the localforage should be updated", async () => {
      const newProjectItem = { id: projectItem.id, name: "updateD name" };
      Service.updateProject({ key: newProjectItem.id, data: newProjectItem });
      const data = await Service.getAllProject();
      expect(Object.values(data)).toEqual([newProjectItem]);
    });

    it("Remove the record, the localforage should be updated", async () => {
      Service.removeProject(projectItem.id);
      const data = await Service.getAllProject();
      expect(Object.values(data)).toHaveLength(0);
    });
  });
});
