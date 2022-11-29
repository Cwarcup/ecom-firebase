import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import Authenticate from './components/Authenticate'
import SignUp from './components/SignUp'
import CategoryPreview from './components/CategoryPreview'
import Cart from './components/Cart'
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from './utils/firebase/firebaseUtils'

import { useDispatch } from 'react-redux'
import { setUser } from './redux/slices/userSlice'
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // onAuthStateChangedListener() is a function that returns an unsubscribe function
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      dispatch(setUser(user))
    })

    return unsubscribe // unsubscribe from the listener when the component unmounts
  }, [])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // state for mobile menu

  return (
    <Routes>
      <Route
        path='/'
        element={<Nav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />}
      >
        <Route index element={<Home setMobileMenuOpen={setMobileMenuOpen} />} />
        <Route path='sign-in' element={<Authenticate />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='shop/*' element={<CategoryPreview />} />
        <Route path='cart' element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App
