import React from 'react';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shopSelector';
import CollectionItem from '../../components/collection-item/collection-item';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
    console.log(collection);

    return (
    <div className='collection-page'>
        <h2>Collection PAGE</h2>
    </div>
)};

const mapStateToProps = (state, ownProps) => ({
    // this returns a createSelector call, so we need to pass state into it
    // ownProps has match cause it was passed via Route from App
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);