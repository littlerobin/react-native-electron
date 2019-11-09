// @flow

import isElectronRenderer from 'is-electron-renderer';

export const createStorage = () =>
  isElectronRenderer ?
    require('equivalen-redux-persist-electron-storage').default() :
    require('redux-persist/lib/storage').default;
