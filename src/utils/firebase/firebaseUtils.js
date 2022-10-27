// set up firebase

import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
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
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

// firestore - database
export const db = getFirestore()

// create or confirm a user document in the firestore database
// pass the response.user object from the signInWithGooglePopup() function
export const createUserDocumentFromAuth = async (userAuth, additionalInformationObj) => {
  // if there is no userAuth object, return
  if (!userAuth) return

  // creates a reference to the user document in the firestore database
  const userRef = doc(db, 'users', userAuth.uid)

  // get the data related to a document. Returns a DocumentSnapshot
  const userSnapshot = await getDoc(userRef)

  // if user data does not exist, create a new user document in the firestore database. Use the userAuth object to create the user data
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformationObj,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  // if user data exists, return the user data
  return userRef
}

// Authenticate with Firebase using Password-Based Accounts
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

// Sign in with Firebase using Password-Based Accounts
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

// Sign out with Firebase
export const signOutUser = async () => {
  await signOut(auth)
}

// observer - Adds an observer for changes to the user's sign-in state.
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
