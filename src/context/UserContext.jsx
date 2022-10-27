import { createContext, useState, useEffect } from 'react'
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebaseUtils'

// the actual value of the context is an object
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

// provider component
export const UserProvider = ({ children }) => {
  // the initial state of the user context, base, empty state
  const [currentUser, setCurrentUser] = useState(null)
  // allows you to pass the getter and setter functions to the children components
  const value = { currentUser, setCurrentUser }

  useEffect(() => {
    // onAuthStateChangedListener() is a function that returns an unsubscribe function
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
    })

    return unsubscribe // unsubscribe from the listener when the component unmounts
  }, [])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
