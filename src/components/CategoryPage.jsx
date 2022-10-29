// need to get the value from the URL
import { useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { CategoriesContext } from '../context/CategoriesContext'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'

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
          <div key={product.id} className='group relative'>
            <div className='min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80'>
              <img
                src={product.imageUrl}
                alt={product.name}
                className='h-full w-full object-cover object-center lg:h-full lg:w-full'
              />
            </div>
            <div className='mt-4 flex justify-between'>
              <div>
                <h3 className='text-sm text-gray-700'>
                  <a href={'#'}>
                    <span aria-hidden='true' className='absolute inset-0' />
                    {product.name}
                  </a>
                </h3>
              </div>
              <p className='text-sm font-medium text-gray-900'>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryPage
