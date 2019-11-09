export default (callback, ...args) =>
  new Promise(resolve => resolve(callback(...args))); // eslint-disable-line
