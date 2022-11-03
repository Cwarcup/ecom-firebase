import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import PaymentForm from './PaymentForm'

const Cart = () => {
  const { cartItems, cartTotal } = useSelector((state) => state.cart)

  return (
    <section className='h-screen py-12 sm:py-16 lg:py-20'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-center'>
          <h1 className='text-2xl font-semibold text-gray-900'>Your Cart</h1>
        </div>

        <div className='mx-auto mt-8 max-w-2xl md:mt-12'>
          <div className='bg-white shadow rounded-lg'>
            <div className='px-4 py-6 sm:px-8 sm:py-10'>
              <div className='flow-root'>
                <ul className='-my-8'>
                  {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                  ))}
                </ul>
              </div>

              <div className='mt-6 border-t border-b py-2'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm text-gray-400'>Subtotal</p>
                  <p className='text-lg font-semibold text-gray-900'>${cartTotal}</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p className='text-sm text-gray-400'>Shipping</p>
                  <p className='text-lg font-semibold text-gray-900'>$8.00</p>
                </div>
              </div>
              <div className='mt-6 flex items-center justify-between'>
                <p className='text-sm font-medium text-gray-900'>Total</p>
                <p className='text-2xl font-semibold text-gray-900'>
                  <span className='text-xs font-normal text-gray-400'>CAD</span> ${cartTotal + 8}
                </p>
              </div>
              <PaymentForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
