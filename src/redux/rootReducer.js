import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // this is local storage

import userReducer from './user/userReducer';
import cartReducer from './cart/cartReducer';

// only persist cartReducer because userReducer is handled by firebase
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);