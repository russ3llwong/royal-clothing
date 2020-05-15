import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { setCurrentUser } from './redux/user/userActions';
import { selectCurrentUser } from './redux/user/userSelectors';
import HomePage from './pages/homepage/homepage.component';
import CheckoutPage from './pages/checkout/checkout.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;

    // firebase will keep track of user session
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // gets documentSnapshot
        // gets fired whenever snapshot changes
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id, // uid
              ...snapShot.data() // other data of user
          });
        });
      } 
      
      setCurrentUser(userAuth);
      // move shop data into firebase only once
      // addCollectionAndDocuments(
      //   'collections', 
      //   collectionsArray.map(({title, items}) => ({title, items})))
    });
  }


  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => 
            this.props.currentUser ? (
              <Redirect to='/'/>
            ) : (
              <SignInAndSignUp />
            ) 
          }/>
        </Switch>
      </div>
    );
  };
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

// app does not need mapStateToProps hence null for 1st arg
export default connect(mapStateToProps, mapDispatchToProps)(App);
