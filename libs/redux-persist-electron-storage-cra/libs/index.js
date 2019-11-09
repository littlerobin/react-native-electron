import Store from './electron-store';

const createElectronStorage = ({ electronStoreOpts } = {}) => {
  const store = new Store(electronStoreOpts || {});

  return {
    getItem: key => {
      // eslint-disable-next-line
      return new Promise(resolve => {
        resolve(store.get(key));
      });
    },
    setItem: (key, item) => {
      // eslint-disable-next-line
      return new Promise(resolve => {
        resolve(store.set(key, item));
      });
    },
    removeItem: key => {
      // eslint-disable-next-line
      return new Promise(resolve => {
        resolve(store.delete(key));
      });
    },
  };
};

export default createElectronStorage;
