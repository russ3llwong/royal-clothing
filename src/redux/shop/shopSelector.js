import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    // get all keys, map over that array of keys, 
    // so we get the value of our collection object at that key
    // which will give us an array of items
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam =>createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  );