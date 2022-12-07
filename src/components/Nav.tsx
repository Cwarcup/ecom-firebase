import { Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { GiSlicedBread } from 'react-icons/gi'

import Footer from './Footer'
import { signOutUser } from '../utils/firebase/firebaseUtils'
import { currentUserSelector } from '../redux/slices/userSlice'
import { selectCartCount, selectCartItems } from '../redux/slices/cartSlice'
import { CartItemType } from '../types/cartTypes'

// function to conditionally join classNames together depending on the truthiness of the arguments
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type NavProps = {
  mobileMenuOpen: boolean
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav = ({ mobileMenuOpen, setMobileMenuOpen }: NavProps) => {
  const currentUser = useSelector(currentUserSelector)
  const cartCount = useSelector(selectCartCount)
  const cartItems = useSelector(selectCartItems)
  const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']

  const navLinks = {
    pages: ['Womens', 'Mens', 'Hats', 'Jackets', 'Sneakers'],
  }

  return (
    <>
      <div>
        {/* Mobile nav */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as='div' className='relative z-40 lg:hidden' onClose={setMobileMenuOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl'>
                  <div className='flex px-4 pt-5 pb-2'>
                    <button
                      type='button'
                      className='inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className='sr-only'>Close menu</span>
                      <XMarkIcon className='w-6 h-6' aria-hidden='true' />
                    </button>
                  </div>

                  <div className='px-4 py-6 space-y-6 border-t border-gray-200'>
                    {navLinks.pages.map((page) => (
                      <div key={page} className='flow-root'>
                        <Link
                          to={`/shop/${page.toLowerCase()}`}
                          className='block p-2 -m-2 font-medium text-gray-900'
                        >
                          {page}
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className='px-4 py-6 space-y-6 border-t border-gray-200'>
                    {currentUser ? (
                      <div className='flow-root'>
                        <button
                          className='block p-2 -m-2 font-medium text-gray-900'
                          onClick={signOutUser}
                        >
                          Sign out
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className='flow-root'>
                          <Link to='/sign-up' className='block p-2 -m-2 font-medium text-gray-900'>
                            Create an account
                          </Link>
                        </div>
                        <div className='flow-root'>
                          <Link to='/sign-in' className='block p-2 -m-2 font-medium text-gray-900'>
                            Sign in
                          </Link>
                        </div>
                      </>
                    )}
                  </div>

                  <div className='px-4 py-6 space-y-6 border-t border-gray-200'>
                    {/* Currency selector */}
                    <form>
                      <div className='inline-block'>
                        <label htmlFor='mobile-currency' className='sr-only'>
                          Currency
                        </label>
                        <div className='relative -ml-2 border-transparent rounded-md group focus-within:ring-2 focus-within:ring-white'>
                          <select
                            id='mobile-currency'
                            name='currency'
                            className='flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800'
                          >
                            {currencies.map((currency) => (
                              <option key={currency}>{currency}</option>
                            ))}
                          </select>
                          <div className='absolute inset-y-0 right-0 flex items-center pointer-events-none'>
                            <ChevronDownIcon className='w-5 h-5 text-gray-500' aria-hidden='true' />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        {/* Mobile nav end */}

        {/* regular nav */}
        <header className='relative z-10 bg-gray-700'>
          <nav aria-label='Top'>
            {/* Top navigation */}
            <div className='bg-gray-900'>
              <div className='flex items-center justify-between h-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                {/* Currency selector */}
                <form>
                  <div>
                    <label htmlFor='desktop-currency' className='sr-only'>
                      Currency
                    </label>
                    <div className='relative -ml-2 bg-gray-900 border-transparent rounded-md group focus-within:ring-2 focus-within:ring-white'>
                      <select
                        id='desktop-currency'
                        name='currency'
                        className='flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100'
                      >
                        {currencies.map((currency) => (
                          <option key={currency}>{currency}</option>
                        ))}
                      </select>
                      <div className='absolute inset-y-0 right-0 flex items-center pointer-events-none'>
                        <ChevronDownIcon className='w-5 h-5 text-gray-300' aria-hidden='true' />
                      </div>
                    </div>
                  </div>
                </form>

                {/* conditional sing in / sign out */}
                <div className='flex items-center space-x-6'>
                  {currentUser ? (
                    <button
                      onClick={signOutUser}
                      className='text-sm font-medium text-white hover:text-gray-100'
                    >
                      Sign Out
                    </button>
                  ) : (
                    <>
                      <Link
                        to='/sign-in'
                        className='text-sm font-medium text-white hover:text-gray-100'
                      >
                        Sign in
                      </Link>
                      <Link
                        to='/sign-up'
                        className='text-sm font-medium text-white hover:text-gray-100'
                      >
                        Create an account
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Secondary navigation */}
            <div className='bg-white bg-opacity-10 backdrop-blur-md backdrop-filter'>
              <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <div>
                  <div className='flex items-center justify-between h-16'>
                    {/* Logo (lg+) */}
                    <div className='hidden lg:flex lg:flex-1 lg:items-center'>
                      <Link to='/'>
                        <span className='sr-only'>Loaf</span>
                        <GiSlicedBread className='w-8 h-8 text-white' />
                      </Link>
                    </div>

                    <div className='hidden h-full lg:flex'>
                      {/* Flyout menus */}
                      <Popover.Group className='inset-x-0 bottom-0 px-4'>
                        <div className='flex justify-center h-full space-x-8'>
                          {navLinks.pages.map((page) => (
                            <Link
                              key={page}
                              to={`/shop/${page.toLowerCase()}`}
                              className='flex items-center text-sm font-medium text-white'
                            >
                              {page}
                            </Link>
                          ))}
                        </div>
                      </Popover.Group>
                    </div>

                    {/* Mobile menu and search (lg-) */}
                    <div className='flex items-center flex-1 lg:hidden'>
                      <button
                        type='button'
                        className='p-2 -ml-2 text-white'
                        onClick={() => setMobileMenuOpen(true)}
                      >
                        <span className='sr-only'>Open menu</span>
                        <Bars3Icon className='w-6 h-6' aria-hidden='true' />
                      </button>
                    </div>

                    {/* Logo (lg-) */}
                    <a href='#' className='lg:hidden'>
                      <span className='sr-only'>Loaf</span>
                      <GiSlicedBread className='w-8 h-8 text-white' />
                    </a>

                    <div className='flex items-center justify-end flex-1'>
                      <div className='flex items-center lg:ml-8'>
                        {/* Cart */}
                        <Popover className='flow-root ml-4 text-sm lg:relative lg:ml-8'>
                          <Popover.Button className='flex items-center p-2 -m-2 group'>
                            <ShoppingBagIcon
                              className='flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500'
                              aria-hidden='true'
                            />
                            <span className='ml-2 text-sm font-medium text-white'>
                              {cartCount === 0 ? '0' : `${cartCount} items`}
                            </span>
                            <span className='sr-only'>items in cart, view bag</span>
                          </Popover.Button>
                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                          >
                            <Popover.Panel className='absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5'>
                              <h2 className='sr-only'>Shopping Cart</h2>
                              <form className='max-w-2xl px-4 mx-auto'>
                                <ul role='list' className='divide-y divide-gray-200'>
                                  {cartItems.map((product: CartItemType) => (
                                    <li key={product.id} className='flex items-center py-6'>
                                      <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className='flex-none w-16 h-16 border border-gray-200 rounded-md'
                                      />
                                      <div className='flex-auto ml-4'>
                                        <h3 className='font-medium text-gray-900'>
                                          {product.name}
                                        </h3>
                                        <p className='text-gray-500'>
                                          Quantity: {product.quantity}
                                        </p>
                                      </div>
                                    </li>
                                  ))}
                                </ul>

                                <Link
                                  to='/cart'
                                  type='submit'
                                  className='w-full px-4 py-2 text-sm font-medium text-center text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                                >
                                  Checkout
                                </Link>
                              </form>
                            </Popover.Panel>
                          </Transition>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        {/* regular nav */}

        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default Nav
