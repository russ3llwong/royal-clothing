import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100; // Stripe wants price in cents
    const publishableKey = 'pk_test_0qmXfFBiDgQoeuUrHpTk55zq00tKw6jCgR';
    
    // on success callback after submit
    const onToken = token => {
        console.log(token); // pass token to backend to process
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='Royal Clothing, Inc.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;