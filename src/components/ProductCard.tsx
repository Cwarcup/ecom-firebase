// displays the products for a specific category
// http://localhost:3000/shop/:category
// used on src/components/categoryPage.tsx

import { useDispatch } from 'react-redux'
import { addItemToCart } from '../redux/slices/cartSlice'

type ProductCardProps = {
  product: {
    id: number
    name: string
    price: number
    imageUrl: string
  }
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch()

  const handleAddItemToCart = () => {
    dispatch(addItemToCart(product))
  }

  return (
    <div key={product.id}>
      <div className='relative group'>
        <div className='relative w-full overflow-hidden rounded-lg h-72'>
          <img
            src={product.imageUrl}
            alt={product.name}
            className='object-cover object-center w-full h-full group-hover:opacity-75'
          />
        </div>
        <div className='relative mt-4'>
          <h3 className='text-sm font-medium text-gray-900'>{product.name}</h3>
        </div>
        <div className='absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-lg h-72'>
          <div
            aria-hidden='true'
            className='absolute inset-x-0 bottom-0 opacity-50 h-36 bg-gradient-to-t from-black'
          />
          <p className='relative text-lg font-semibold text-white'>${product.price}</p>
        </div>
      </div>
      <div className='mt-6'>
        <button
          onClick={handleAddItemToCart}
          className='relative flex items-center justify-center w-full px-8 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200'
        >
          Add to bag<span className='sr-only'>, {product.name}</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
