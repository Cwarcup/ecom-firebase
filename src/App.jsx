import categoriesJSON from './data/categories.json'
import CategoryItem from './components/categoryItem/CategoryItem'

function App() {
  return (
    <div className='categories-container'>
      {categoriesJSON.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default App
