// need to get the value from the URL
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import { selectCategoriesMap } from '../redux/slices/categoriesSlice'

const CategoryPage = () => {
  // TODO: category is 'undefined' according to typescript. Why?
  const { category } = useParams()

  const categoriesMap = useSelector(selectCategoriesMap)

  const [categoryItems, setCategoryItems] = useState([])

  useEffect(() => {
    if (categoriesMap) {
      const categoryItems = categoriesMap[category]
      setCategoryItems(categoryItems)
    }
  }, [categoriesMap, category])

  return (
    <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
        {capitalizeFirstLetter(category)} Collection
      </h2>
      <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {categoryItems &&
          categoryItems.map((item, index) => <ProductCard key={item.id} product={item} />)}
      </div>

      <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'></div>
    </div>
  )
}

export default CategoryPage
