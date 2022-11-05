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
  User,
  NextOrObserver,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore'

import { Category } from '../../types/CategoryType'

// create an app instance based off the config
const firebaseConfig = {
  apiKey: 'AIzaSyBfN9EoX61WfZWOJBl_I6L8CO6lMrj9dg0',
  authDomain: 'lf-clothing-db.firebaseapp.com',
  projectId: 'lf-clothing-db',
  storageBucket: 'lf-clothing-db.appspot.com',
  messagingSenderId: '770737674200',
  appId: '1:770737674200:web:ab3d5874540ecee38a44ad',
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

export type ObjectToAdd = {
  title: string
}

// adding a collection to firestore
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[],
): Promise<void> => {
  // create a collection reference using the db we created above
  const collectionRef = collection(db, collectionKey)

  // use a batch to write multiple documents at once
  const batch = writeBatch(db)

  objectsToAdd.forEach((obj) => {
    // create a new document reference
    // we are using the title from the object for the collection document id
    const newDocRef = doc(collectionRef, obj.title.toLowerCase())
    // add the object to the batch
    batch.set(newDocRef, obj)
  })

  // begins the batch write
  await batch.commit()
  console.log('batch write complete')
}

// get a document from firestore
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q) // can use this to access the data

  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data()
  //   acc[title.toLowerCase()]: = items
  //   return acc
  // }, [])
  return querySnapshot.docs.map((docSnapshot) => {
    const { title, items } = docSnapshot.data()
    return { title, items } as Category
  })
}

export type AdditionalInformation = {
  displayName?: string
}

export type UserData = {
  createdAt: Date
  displayName: string
  email: string
}
// create or confirm a user document in the firestore database
// pass the response.user object from the signInWithGooglePopup() function
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformationObj = {} as AdditionalInformation,
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      console.log('error creating user', error)
    }
  }

  // if user data exists, return the user data
  return userSnapshot as QueryDocumentSnapshot<UserData>
}

// Authenticate with Firebase using Password-Based Accounts
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

// Sign in with Firebase using Password-Based Accounts
export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

// Sign out with Firebase
export const signOutUser = async () => {
  await signOut(auth)
}

// observer - Adds an observer for changes to the user's sign-in state.
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback)

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe()
        resolve(userAuth)
      },
      reject,
    )
  })
}
