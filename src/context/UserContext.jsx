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

export const USER_ACTION_TYPES = {
  SET_USER: 'SET_USER',
}

// create a reducer function to update the state
const userReducer = (state, action) => {
  // we always have a type and a payload on the action
  const { type, payload } = action

  // use a switch statement to handle different actions
  switch (type) {
    case 'SET_USER':
      return {
        ...state, // spread the current state
        currentUser: payload,
      }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

const INITIAL_USER_STATE = {
  currentUser: null,
}

// provider component
export const UserProvider = ({ children }) => {
  // use the reducer to update the state
  const [state, dispatch] = useReducer(userReducer, INITIAL_USER_STATE)

  const { currentUser } = state

  const setCurrentUser = (user) => {
    dispatch({
      type: USER_ACTION_TYPES.SET_USER,
      payload: user,
    })
  }

  // the initial state of the user context, base, empty state
  // const [currentUser, setCurrentUser] = useState(null)
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

// const userReducer = (state, action) => {
//   return {
//     currentUser: null,
//   }
// }
