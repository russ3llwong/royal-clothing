import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDtZPG0REEGBReIPC-uAj1dMSrFW3Rkp8E",
    authDomain: "royal-clothing-6749a.firebaseapp.com",
    databaseURL: "https://royal-clothing-6749a.firebaseio.com",
    projectId: "royal-clothing-6749a",
    storageBucket: "royal-clothing-6749a.appspot.com",
    messagingSenderId: "1063810706974",
    appId: "1:1063810706974:web:7524b566b85d85b11ac80f",
    measurementId: "G-2FWTR4G6NJ"
  };

export const createUserProfileDocument = async (userAuth, additionalDate) => {
  if (!userAuth) return;

  // returns a firebase Doc reference object
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // create user in db if it does not exist
  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt= new Date();
    // async request to database
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalDate
      })
    } catch (error) {
      console.log('error creating user, ', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '}); // to always trigger google pop up
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

