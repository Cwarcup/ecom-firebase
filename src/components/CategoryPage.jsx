// need to get the value from the URL
import { useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { CategoriesContext } from '../context/CategoriesContext'
import { CartContext } from '../context/CartContext'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'
import ProductCard from '../components/ProductCard'

const CategoryPage = () => {
  const { category } = useParams()
  const { categories } = useContext(CategoriesContext)

  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(categories[category])
  }, [category, categories])

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
