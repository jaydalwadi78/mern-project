export const localStorageHelper = {
    load(key) {
        return localStorage.getItem(key);
    },
    store(key, value) {
        localStorage.setItem(key, value);
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};