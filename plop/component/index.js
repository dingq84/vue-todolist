const path = require("path");
const { componentExists } = require("../util");
const componentPath = path.resolve("src/components");
const testPath = path.resolve("src/tests/unit");

module.exports = {
  description: "add Component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Please Enter new component name:",
      default: "MyButton",
      validate(value) {
        if (!/^[A-Za-z][A-Za-z0-9]+$/.test(value)) return "Invalidte component name!";
        return componentExists(value) ? "Component name already exists!" : true;
      },
    },
  ],
  actions: () => [
    {
      type: "add",
      path: `${componentPath}/{{ properCase name }}/index.js`,
      templateFile: "component/index.hbs",
      abortOnFail: true,
    },
    {
      type: "add",
      path: `${componentPath}/{{ properCase name }}/{{ properCase name }}.vue`,
      templateFile: "component/vue.hbs",
      abortOnFail: true,
    },
    {
      type: "add",
      path: `${testPath}/{{properCase name}}.spec.js`,
      templateFile: "component/index.spec.hbs",
      abortOnFail: true,
    },
  ],
};
