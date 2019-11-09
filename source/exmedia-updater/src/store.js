// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const enhancers = [];
const middleware = [thunk];

if (process.env.REACT_APP_STAGE) {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export default function configureStore() {
  const store = createStore(
    rootReducer,
    {},
    composedEnhancers
  );
  const persistor = persistStore(store);

  return { store, persistor };
}
