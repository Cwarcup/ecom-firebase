import { createContext, useEffect, useReducer } from 'react'
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
  // use the reducer to update the state


  const { currentUser } = state

  // the initial state of the user context, base, empty state
  // const [currentUser, setCurrentUser] = useState(null)
  // allows you to pass the getter and setter functions to the children components
  const value = { currentUser, setCurrentUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// const userReducer = (state, action) => {
//   return {
//     currentUser: null,
//   }
// }
