// Use in the cart checkout page - Cart.jsxrepresents a line item in the cart
// Has ability to remove, add, clear item from cart
// Coordinates with the cart reducer to update the cart state (products, total, etc)
// Accepts a cartItem prop

import { useDispatch } from 'react-redux'
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../redux/slices/cartSlice'
import type { CartItemType } from '../types/cartTypes'

type CartItemPropsType = {
  cartItem: CartItemType
}

const CartItem = ({ cartItem }: CartItemPropsType) => {
  const dispatch = useDispatch()

  const handleRemoveCartItem = () => {
    dispatch(removeItemFromCart(cartItem))
  }

  const handleAddCartItem = () => {
    dispatch(addItemToCart(cartItem))
  }

  const handleClearCartItem = () => {
    dispatch(clearItemFromCart(cartItem))
  }

  return (
    <li key={cartItem.id} className='flex py-6 sm:py-10'>
      <div className='flex-shrink-0'>
        <img
          className='object-cover object-center w-24 h-24 rounded-lg sm:h-32 sm:w-32'
          src={cartItem.imageUrl}
          alt={cartItem.name}
        />
      </div>
      <div className='relative flex flex-col justify-between flex-1 ml-4 sm:ml-6'>
        <div>
          <div className='flex justify-between sm:grid sm:grid-cols-2'>
            <div className='pr-6'>
              <h3 className='text-sm'>
                <a
                  href={cartItem.imageUrl}
                  className='font-medium text-gray-700 hover:text-gray-800'
                >
                  {cartItem.name}
                </a>
              </h3>
            </div>

            <p className='text-sm font-medium text-right text-gray-900'>${cartItem.price}.00</p>
          </div>

          <div className='flex items-center mt-4 sm:absolute sm:top-0 sm:left-1/2 sm:mt-0 sm:block'>
            <label htmlFor={`quantity-${cartItem.quantity}`} className='sr-only'>
              Quantity, {cartItem.name}
            </label>
            <div className='sm:order-1'>
              <div className='flex items-stretch h-8 mx-auto text-gray-600'>
                <button
                  className='flex items-center justify-center px-4 transition bg-gray-200 rounded-l-md hover:bg-black hover:text-white'
                  onClick={handleRemoveCartItem}
                >
                  -
                </button>
                <div className='flex items-center justify-center w-full px-4 text-xs uppercase transition bg-gray-100'>
                  {cartItem?.quantity}
                </div>
                <button
                  className='flex items-center justify-center px-4 transition bg-gray-200 rounded-r-md hover:bg-black hover:text-white'
                  onClick={handleAddCartItem}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItem
