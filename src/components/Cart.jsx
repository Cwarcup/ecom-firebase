import CartItem from './CartItem'
import shopData from '../data/shop-data'

const Cart = () => {
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
                  {shopData.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                  ))}
                </ul>
              </div>

              <div className='mt-6 border-t border-b py-2'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm text-gray-400'>Subtotal</p>
                  <p className='text-lg font-semibold text-gray-900'>$399.00</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p className='text-sm text-gray-400'>Shipping</p>
                  <p className='text-lg font-semibold text-gray-900'>$8.00</p>
                </div>
              </div>
              <div className='mt-6 flex items-center justify-between'>
                <p className='text-sm font-medium text-gray-900'>Total</p>
                <p className='text-2xl font-semibold text-gray-900'>
                  <span className='text-xs font-normal text-gray-400'>USD</span> 408.00
                </p>
              </div>

              <div className='mt-6 text-center'>
                <button
                  type='button'
                  className='group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800'
                >
                  Checkout
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='group-hover:ml-8 ml-4 h-6 w-6 transition-all'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M13 7l5 5m0 0l-5 5m5-5H6'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
