import ShopActionTypes from './shopTypes';

export const updateCollections = collectionsHashmap => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsHashmap
})