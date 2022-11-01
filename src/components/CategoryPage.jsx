// need to get the value from the URL
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'
import ProductCard from '../components/ProductCard'
import { selectCategoriesMap } from '../store/categories/categorySelector'
import { useSelector } from 'react-redux'

// shows the list of items for a category
const CategoryPage = () => {
  const categoriesMap = useSelector(selectCategoriesMap)
  const { category } = useParams()

  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
        {capitalizeFirstLetter(category)} Collection
      </h2>

      <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default CategoryPage
