// @flow

import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { createStorage } from './storage';
import globalReducer from './globalReducer';
import archiveReducer from './archiveReducer';
import bankSoalReducer from './bankSoalReducer';
import mainReducer from './mainReducer';

const mainPersistConfig = {
  key: 'main',
  storage: createStorage(),
  whitelist: ['time', 'userLessonData', 'currentMatpel'],
  blacklist: ['startTime'],
};

const rootReducer = combineReducers({
  global: globalReducer,
  archive: archiveReducer,
  bankSoal: bankSoalReducer,
  main: persistReducer(mainPersistConfig, mainReducer),
});

export default rootReducer;
