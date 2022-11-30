/*
Is the dashboard for the cart page
Iterates over the cartItems and displays them in a list using the CartItem component
*/

import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../redux/slices/cartSlice'
import PaymentForm from './PaymentForm'
import type { CartItemType } from '../types/cartTypes'
import { Link } from 'react-router-dom'

const Cart = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

  return (
    <div className='bg-white'>
      <div className='max-w-4xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Shopping Cart</h1>

        <div className='mt-12'>
          <div>
            <h2 className='sr-only'>Items in your shopping cart</h2>

            <ul role='list' className='border-t border-b border-gray-200 divide-y divide-gray-200'>
              {cartItems.map((product) => (
                <CartItem key={product.id} cartItem={product} />
              ))}
            </ul>
          </div>

          {/* Order summary */}
          <div className='mt-10 sm:ml-32 sm:pl-6'>
            <div className='px-4 py-6 rounded-lg bg-gray-50 sm:p-6 lg:p-8'>
              <h2 className='sr-only'>Order summary</h2>

              <div className='flow-root'>
                <dl className='-my-4 text-sm divide-y divide-gray-200'>
                  <div className='flex items-center justify-between py-4'>
                    <dt className='text-gray-600'>Subtotal</dt>
                    <dd className='font-medium text-gray-900'>${cartTotal}.00</dd>
                  </div>
                  <div className='flex items-center justify-between py-4'>
                    <dt className='text-gray-600'>Shipping</dt>
                    <dd className='font-medium text-gray-900'>FREE</dd>
                  </div>
                  <div className='flex items-center justify-between py-4'>
                    <dt className='text-gray-600'>Tax</dt>
                    <dd className='font-medium text-gray-900'>
                      {cartTotal * 0.1 > 0 ? `$${(cartTotal * 0.12).toFixed(2)}` : '$0.00'}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between py-4'>
                    <dt className='text-base font-medium text-gray-900'>Order total</dt>
                    <dd className='text-base font-medium text-gray-900'>
                      {cartTotal * 0.1 > 0
                        ? `$${(cartTotal * 1.12).toFixed(2)}`
                        : `$${cartTotal}.00`}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className='mt-10'>
              <PaymentForm />
            </div>

            <div className='mt-6 text-sm text-center text-gray-500'>
              <p>
                or{' '}
                <Link to={'/'} className='font-medium text-indigo-600 hover:text-indigo-500'>
                  Continue Shopping
                  <span aria-hidden='true'> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

// <section className='h-screen py-12 sm:py-16 lg:py-20'>
//   <div className='px-4 mx-auto sm:px-6 lg:px-8'>
//     <div className='flex items-center justify-center'>
//       <h1 className='text-2xl font-semibold text-gray-900'>Your Cart</h1>
//     </div>

//     <div className='max-w-2xl mx-auto mt-8 md:mt-12'>
//       <div className='bg-white rounded-lg shadow'>
//         <div className='px-4 py-6 sm:px-8 sm:py-10'>
//           <div className='flow-root'>
//             <ul className='-my-8'>
//               {cartItems.map((item: CartItemType) => (
//                 <CartItem key={item.id} cartItem={item} />
//               ))}
//             </ul>
//           </div>

//           <div className='py-2 mt-6 border-t border-b'>
//             <div className='flex items-center justify-between'>
//               <p className='text-sm text-gray-400'>Subtotal</p>
//               <p className='text-lg font-semibold text-gray-900'>${cartTotal}</p>
//             </div>
//             <div className='flex items-center justify-between'>
//               <p className='text-sm text-gray-400'>Shipping</p>
//               <p className='text-lg font-semibold text-gray-900'>$8.00</p>
//             </div>
//           </div>
//           <div className='flex items-center justify-between mt-6'>
//             <p className='text-sm font-medium text-gray-900'>Total</p>
//             <p className='text-2xl font-semibold text-gray-900'>
//               <span className='text-xs font-normal text-gray-400'>CAD</span> ${cartTotal + 8}
//             </p>
//           </div>
//           <PaymentForm />
//         </div>
//       </div>
//     </div>
//   </div>
// </section>
