import { all, call } from 'redux-saga/effects';
import { fetchCollectionsStart } from './shop/shopSaga';
import { userSagas } from './user/userSaga';

export default function* rootSaga() {
    // invoke an array of generators
    yield all([
        call(fetchCollectionsStart),
        call(userSagas)
    ]);
}