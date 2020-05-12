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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '}); // to always trigger google pop up
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

