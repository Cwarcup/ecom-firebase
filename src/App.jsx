import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Authenticate from './components/Authenticate'
import SignUp from './components/SignUp'
import CategoryPreview from './components/CategoryPreview'
import Cart from './components/Cart'
import CategoryPage from './components/CategoryPage'

function App() {
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
