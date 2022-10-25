import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='*' element={<h1>Not Found</h1>} />
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default App
