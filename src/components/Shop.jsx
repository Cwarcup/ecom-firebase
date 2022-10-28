import { Fragment, useContext } from 'react'
import { CategoriesContext } from '../context/CategoriesContext'
import ProductCard from './ProductCard'

const shop = () => {
  const { categories } = useContext(CategoriesContext)
  console.log('categories', categories)

  const allProducts = Object.keys(categories).map((products) => {
    const productCards = categories[products].map((item) => {
      return <ProductCard key={item.id} product={item} />
    })

    return productCards
  })

  return (
    <div className='grid grid-cols-2 gap-x-6 gap-y-3 p-2 sm:grid-cols-3 sm:px-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-4 lg:px-0'>
      {allProducts}
    </div>
  )
}

export default shop
