import { useState, useContext, useEffect } from 'react'
import { CategoriesContext } from '../context/CategoriesContext'
import ProductCard from './ProductCard'

const shop = () => {
  const { categories } = useContext(CategoriesContext)

  const CategoryPreview = (categoryTitle, limit) => {
    const products = categories[categoryTitle].map((item) => (
      <div key={item.id} className='group relative'>
        <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1'>
          <img
            src={item.imageUrl}
            alt={item.title}
            className='h-full w-full object-cover object-center'
          />
        </div>
        <h3 className='mt-6 text-sm text-gray-500'>
          <a href={'#'}>
            <span className='absolute inset-0' />
            {item.title}
          </a>
        </h3>
        <p className='text-base font-semibold text-gray-900'>{item.title}</p>
      </div>
    ))

    return (
      <div className='bg-gray-100'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32'>
            <h2 className='text-2xl font-bold text-gray-900'>{categoryTitle}</h2>

            <div className='mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
              {products.slice(0, limit)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // const ProductsForACategory = (categoryTitle, limit) => {
  //   const products = categories[categoryTitle].map((item) => {
  //     return <ProductCard key={item.id} product={item} />
  //   })

  //   return products.slice(0, limit)
  // }

  return (
    <>
      {CategoryPreview('jackets', 3)}
      {CategoryPreview('sneakers', 3)}
      {CategoryPreview('womens', 3)}
      {CategoryPreview('mens', 3)}
    </>
  )
}

export default shop
