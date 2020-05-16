import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist'; // browser can cache the store
import rootReducer from './rootReducer';
// import thunk from 'redux-thunk';
import createSageMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

// const middlewares = [thunk];

const sagaMiddleware = createSageMiddleware();
const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };