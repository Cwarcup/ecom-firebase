// set up firebase

import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

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

// firestore
export const db = getFirestore()

// pass the response.user object from the signInWithGooglePopup() function
export const createUserDocumentFromAuth = async (userAuth) => {
  // creates a reference to the user document in the firestore database
  const userRef = doc(db, 'users', userAuth.uid)
  console.log('userRef: ', userRef)
  // get the data related to a document. Returns a DocumentSnapshot
  const userSnapshot = await getDoc(userRef)
  //
  console.log('userSnapshot', userSnapshot.exists()) // true or false
}
