import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// High-Order-Component
// Takes a component in and return a modified version of it
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps} />
    )
}

export default WithSpinner;