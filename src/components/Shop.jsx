import { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext'
import ProductCard from './ProductCard'

const shop = () => {
  const { products } = useContext(ProductsContext)
  console.log('products from shop', products)
  return (
    <div className='grid grid-cols-2 gap-x-6 gap-y-3 p-2 sm:grid-cols-3 sm:px-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-4 lg:px-0'>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default shop
