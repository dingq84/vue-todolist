import localforage from "localforage";
import "localforage-getitems";

/*------------------------Todo service--------------------------------*/
const todoDatabase = localforage.createInstance({
  name: "todoitem",
  version: 1.0,
  storeName: "todolist",
});

export const addTodoItem = ({ key, data }) => {
  todoDatabase.setItem(key, data);
};

export const removeTodoItem = key => {
  todoDatabase.removeItem(key);
};

export const updateTodoItem = ({ key, data }) => {
  todoDatabase.getItem(key).then(() => {
    todoDatabase.setItem(key, data);
  });
};

export const getAllTodoItem = () => {
  return todoDatabase.getItems();
};
/*------------------------Todo service--------------------------------*/
/*------------------------Project service-----------------------------*/
const projectDatabase = localforage.createInstance({
  name: "todoitem",
  version: 1.0,
  storeName: "projectList",
});

export const addProject = ({ key, data }) => {
  projectDatabase.setItem(key, data);
};

export const removeProject = key => {
  projectDatabase.removeItem(key);
};

export const updateProject = ({ key, data }) => {
  projectDatabase.getItem(key).then(() => {
    projectDatabase.setItem(key, data);
  });
};

export const getAllProject = () => {
  return projectDatabase.getItems();
};
/*------------------------Project service-----------------------------*/
