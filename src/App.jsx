import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Nav />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
