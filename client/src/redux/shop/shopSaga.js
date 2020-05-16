import { takeLatest, call, put } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import ShopActionTypes from './shopTypes';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shopActions';

// generator function, must have a yield
// saga will run this in the background
export function* fetchCollectionsAsync() {

    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
        // put is similar to dispatch, saga's way of invoking action
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
        
}

export function* fetchCollectionsStart() {
    // creates a non-blocking call
    // resolves the latest saga only
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );
}