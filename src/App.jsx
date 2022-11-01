import { useEffect } from 'react'
// import { useDispatch } from 'react-redux' // NEW
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
// import { setCurrentUser } from './store/user/userAction'


import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './store/user/userSlice'
function App() {
  const dispatch = useDispatch() // NEW
  const currentUser = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    // onAuthStateChangedListener() is a function that returns an unsubscribe function
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      dispatch(setUser(user)) // NEW
    })

    return unsubscribe // unsubscribe from the listener when the component unmounts
  }, [])
  return (
    <Routes>
      <Route path='/' element={<Nav />}>
        <Route index element={<Home />} />
        <Route path='sign-in' element={<Authenticate />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='shop/*' element={<CategoryPreview />} />
        <Route path='cart' element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App
