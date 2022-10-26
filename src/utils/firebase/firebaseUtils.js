// set up firebase

import { initializeApp } from 'firebase/app'
const {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} = require('firebase/auth')

// create an app instance based off the config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: 'lf-clothing-db',
  storageBucket: 'lf-clothing-db.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// authentication
// docs https://firebase.google.com/docs/auth/web/google-signin?authuser=0
const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
