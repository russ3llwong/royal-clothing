import { createStore, applyMiddleware } from 'redux';
import logger from 'react-redux';

import rootReducer from './rootReducer';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;