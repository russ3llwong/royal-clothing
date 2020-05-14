import { createSelector } from 'reselect';

// input selector
// takes the whole state and return a slice of it
const selectCart = state => state.cart;

// output selector
// uses createSelector
export const selectCartItems = createSelector(
    [selectCart], // collection of input selectors for 1st arg
    (cart) => cart.cartItems // desired output for 2nd arg
)

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumalatedQuantity, cartItem) => 
        accumalatedQuantity + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumalatedQuantity, cartItem) => 
        accumalatedQuantity + cartItem.quantity * cartItem.price, 0)
)