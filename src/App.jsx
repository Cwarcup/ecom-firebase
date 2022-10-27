import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Authenticate from './components/Authenticate'
import SignUp from './components/SignUp'
import Shop from './components/Shop'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Nav />}>
        <Route index element={<Home />} />
        <Route path='sign-in' element={<Authenticate />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  )
}

export default App
