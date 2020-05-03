class FakeLocalForage {
  constructor({ name, version, storeName }) {
    this.name = name;
    this.version = version;
    this.storeName = storeName;
    this.data = {};
  }

  setItem(key, data) {
    this.data[key] = data;
  }

  removeItem(key) {
    delete this.data[key];
  }

  getItem(key) {
    return new Promise(resolve => {
      resolve(this.data[key]);
    });
  }

  getItems() {
    return new Promise(resolve => {
      resolve(this.data);
    });
  }
}

const localforage = {
  createInstance({ name, version, storeName }) {
    return new FakeLocalForage({ name, version, storeName });
  },
};

export default localforage;
