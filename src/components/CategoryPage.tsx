// this is the page presented on the 'shop' page
// displays the categories and links to the category page
// categories are fetched from the firebase database and stored in the redux store
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import { selectCategoriesMap } from '../redux/slices/categoriesSlice'
import type { CategoryItemType } from '../types/categoryTypes'

const CategoryPage = () => {
  const { category } = useParams()
  // need to get the value from the URL
  // use this to link user to the correct category page upon clicking on a category

  // get the categories from the redux store
  const categoriesMap = useSelector(selectCategoriesMap)

  const [categoryItems, setCategoryItems] = useState<CategoryItemType[]>([])

  // find the category in the categoriesMap
  useEffect(() => {
    // iterate over the categoriesMap object and create a new array of items with they key that matches the category
    for (const [key, value] of Object.entries(categoriesMap)) {
      if (value.title.toLowerCase() === category) {
        setCategoryItems(value.items)
      }
    }
  }, [category, categoriesMap])

  console.log({ categoriesMap })

  return (
    <div className='max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
        {capitalizeFirstLetter(category)} Collection
      </h2>
      <div className='grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {categoriesMap && categoryItems.map((item) => <ProductCard key={item.id} product={item} />)}
      </div>

      <div className='grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'></div>
    </div>
  )
}

export default CategoryPage
