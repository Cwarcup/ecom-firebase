import categoriesData from './data/categories.json'
import Directory from './components/Directory'

function App() {
  return (
    <div className='App'>
      <Directory categories={categoriesData} />
    </div>
  )
}

export default App
