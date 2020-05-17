import React, { useEffect } from 'react';
import GlobalStyle from './global.styles';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/userSelectors';
import HomePage from './pages/homepage/homepage.component';
import CheckoutPage from './pages/checkout/checkout.component';
import ShopPage from './pages/shop/shop.component';
import ContactPage from './pages/contact/contact.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { checkUserSession } from './redux/user/userActions';

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]); // property function passed from dispatch
    
  // **this was only ran once to upload shop data to firestore
  // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})))

  return (
    <div>
      <GlobalStyle />
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/contact' component={ContactPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={() => 
          currentUser ? (
            <Redirect to='/'/>
          ) : (
            <SignInAndSignUp />
          ) 
        }/>
      </Switch>
    </div>
  );

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

// app does not need mapStateToProps hence null for 1st arg
export default connect(mapStateToProps, mapDispatchToProps)(App);
