import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cartActions';
import { selectCartItemsCount } from '../../redux/cart/cartSelectors';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon'>
        <ShoppingIcon className='shopping-icon' onClick={toggleCartHidden}/>
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = state => ({
    // selector
    itemCount: selectCartItemsCount(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);