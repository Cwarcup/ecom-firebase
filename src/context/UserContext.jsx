import { createContext, useState } from 'react'

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
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
