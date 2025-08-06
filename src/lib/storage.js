// src/lib/storage.js

// This is a custom storage object for the browser that uses localStorage.
// It's wrapped in a function to ensure it's only created on the client.
const createClientSideStorage = () => {
  return {
    getItem: (key) => {
      return Promise.resolve(localStorage.getItem(key));
    },
    setItem: (key, item) => {
      return Promise.resolve(localStorage.setItem(key, item));
    },
    removeItem: (key) => {
      return Promise.resolve(localStorage.removeItem(key));
    },
  };
};

// This is the dummy storage for the server.
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

// Check if we are in the browser and select the appropriate storage.
const storage =
  typeof window !== "undefined"
    ? createClientSideStorage()
    : createNoopStorage();

export default storage;