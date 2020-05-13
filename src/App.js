import React from 'react';
import './App.css';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component'
import { Switch, Route, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/userActions';

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;

    // firebase will keep track of user session
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // gets documentSnapshot
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id, // uid
              ...snapShot.data() // other data of user
          });
        });
      } else {
        // set currentUser to null
        setCurrentUser(userAuth)
      }
      
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

// app does not need mapStateToProps hence null for 1st arg
export default connect(mapStateToProps, mapDispatchToProps)(App);
