import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
// fetchCollectionsStart -> redux-saga
// fetchCollectionsStartAsync -> thunk
import { fetchCollectionsStart } from '../../redux/shop/shopActions';
import CollectionContainer from '../collection/collection.container';
import CollectionOverviewContainer from '../../components/collections-overview/collections-overview.container';


class ShopPage extends React.Component {

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;

    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);