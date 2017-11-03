import { applyMiddleware, createStore, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';
import rootEpic from '../epics';

const logger = createLogger({
  // predicate: (getState, action) => (action.type.indexOf('_REQUEST') === -1),
  collapsed: true,
});

// const reducer = combineReducers(Object.assign({}, rootReducer));

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = compose(
  applyMiddleware(epicMiddleware, logger)
)(createStore);

const store = createStoreWithMiddleware(
  rootReducer,
  /* eslint-disable */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // window.devToolsExtension && window.devToolsExtension()
  /* eslint-enable */
);

// const store = createStore(rootReducer, window.devToolsExtension && window.devToolsExtension());

export default store;
