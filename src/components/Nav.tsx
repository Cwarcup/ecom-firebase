import { Outlet, Link } from 'react-router-dom'
import { RiTShirt2Line } from 'react-icons/ri'
import { signOutUser } from '../utils/firebase/firebaseUtils'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../redux/slices/userSlice'
import { selectCartCount } from '../redux/slices/cartSlice'

import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { useState, Fragment } from 'react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Footer from './Footer'

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
  const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']

  const navigation = {
    categories: [
      {
        name: 'Women',
        featured: [
          {
            name: 'New Arrivals',
            href: 'shop/womens',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
            imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
          },
          {
            name: 'Basic Tees',
            href: 'shop/womens',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
            imageAlt:
              'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
          {
            name: 'Accessories',
            href: 'shop/womens',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
            imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
          },
          {
            name: 'Carry',
            href: 'shop/womens',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
            imageAlt:
              'Model opening tan leather long wallet with credit card pockets and cash pouch.',
          },
        ],
      },
      {
        name: 'Men',
        featured: [
          {
            name: 'New Arrivals',
            href: 'shop/mens',
            imageSrc:
              'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
            imageAlt:
              'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
          },
          {
            name: 'Basic Tees',
            href: 'shop/mens',
            imageSrc:
              'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
            imageAlt: 'Model wearing light heather gray t-shirt.',
          },
          {
            name: 'Accessories',
            href: 'shop/mens',
            imageSrc:
              'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
            imageAlt:
              'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
          },
          {
            name: 'Carry',
            href: 'shop/mens',
            imageSrc:
              'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
            imageAlt:
              'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
          },
        ],
      },
    ],
    pages: [{ name: 'Company', href: '#' }],
  }

  return (
    <>
      <div className='bg-black'>
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

                  {/* Links */}
                  <Tab.Group as='div' className='mt-2'>
                    <div className='border-b border-gray-200'>
                      <Tab.List className='flex px-4 -mb-px space-x-8'>
                        {navigation.categories.map((category) => (
                          <Tab
                            key={category.name}
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? 'text-indigo-600 border-indigo-600'
                                  : 'text-gray-900 border-transparent',
                                'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium',
                              )
                            }
                          >
                            {category.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category) => (
                        <Tab.Panel key={category.name} className='px-4 py-6 space-y-12'>
                          <div className='grid grid-cols-2 gap-x-4 gap-y-10'>
                            {category.featured.map((item) => (
                              <div key={item.name} className='relative group'>
                                <div className='overflow-hidden bg-gray-100 rounded-md aspect-w-1 aspect-h-1 group-hover:opacity-75'>
                                  <img
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    className='object-cover object-center'
                                  />
                                </div>
                                <Link
                                  to={item.href}
                                  className='block mt-6 text-sm font-medium text-gray-900'
                                >
                                  <span className='absolute inset-0 z-10' aria-hidden='true' />
                                  {item.name}
                                </Link>
                                <p aria-hidden='true' className='mt-1 text-sm text-gray-500'>
                                  Shop now
                                </p>
                              </div>
                            ))}
                          </div>
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className='px-4 py-6 space-y-6 border-t border-gray-200'>
                    {navigation.pages.map((page) => (
                      <div key={page.name} className='flow-root'>
                        <Link to={page.href} className='block p-2 -m-2 font-medium text-gray-900'>
                          {page.name}
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
        <header className='relative z-10'>
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
                        <img
                          className='w-auto h-8'
                          src='https://tailwindui.com/img/logos/mark.svg?color=white'
                          alt=''
                        />
                      </Link>
                    </div>

                    <div className='hidden h-full lg:flex'>
                      {/* Flyout menus */}
                      <Popover.Group className='inset-x-0 bottom-0 px-4'>
                        <div className='flex justify-center h-full space-x-8'>
                          {navigation.categories.map((category) => (
                            <Popover key={category.name} className='flex'>
                              {({ open, close }) => (
                                <>
                                  <div className='relative flex'>
                                    <Popover.Button className='relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out'>
                                      {category.name}
                                      <span
                                        className={classNames(
                                          open ? 'bg-white' : '',
                                          'absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out',
                                        )}
                                        aria-hidden='true'
                                      />
                                    </Popover.Button>
                                  </div>

                                  <Transition
                                    as={Fragment}
                                    enter='transition ease-out duration-200'
                                    enterFrom='opacity-0'
                                    enterTo='opacity-100'
                                    leave='transition ease-in duration-150'
                                    leaveFrom='opacity-100'
                                    leaveTo='opacity-0'
                                  >
                                    <Popover.Panel className='absolute inset-x-0 text-sm text-gray-500 top-full'>
                                      {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                      <div
                                        className='absolute inset-0 bg-white shadow top-1/2'
                                        aria-hidden='true'
                                      />

                                      <div className='relative bg-white'>
                                        <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                                          <div className='grid grid-cols-4 py-16 gap-y-10 gap-x-8'>
                                            {category.featured.map((item) => (
                                              <div
                                                key={item.name}
                                                className='relative group'
                                                onClick={close}
                                              >
                                                <div className='overflow-hidden bg-gray-100 rounded-md aspect-w-1 aspect-h-1 group-hover:opacity-75'>
                                                  <img
                                                    src={item.imageSrc}
                                                    alt={item.imageAlt}
                                                    className='object-cover object-center'
                                                  />
                                                </div>
                                                <Link
                                                  to={item.href}
                                                  className='block mt-4 font-medium text-gray-900'
                                                >
                                                  <span
                                                    className='absolute inset-0 z-10'
                                                    aria-hidden='true'
                                                  />
                                                  {item.name}
                                                </Link>
                                                <p aria-hidden='true' className='mt-1'>
                                                  Shop now
                                                </p>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </Popover.Panel>
                                  </Transition>
                                </>
                              )}
                            </Popover>
                          ))}

                          {navigation.pages.map((page) => (
                            <a
                              key={page.name}
                              href={page.href}
                              className='flex items-center text-sm font-medium text-white'
                            >
                              {page.name}
                            </a>
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

                      {/* Search */}
                      <a href='#' className='p-2 ml-2 text-white'>
                        <span className='sr-only'>Search</span>
                        <MagnifyingGlassIcon className='w-6 h-6' aria-hidden='true' />
                      </a>
                    </div>

                    {/* Logo (lg-) */}
                    <a href='#' className='lg:hidden'>
                      <span className='sr-only'>Your Company</span>
                      <img
                        src='https://tailwindui.com/img/logos/mark.svg?color=white'
                        alt=''
                        className='w-auto h-8'
                      />
                    </a>

                    <div className='flex items-center justify-end flex-1'>
                      <a href='#' className='hidden text-sm font-medium text-white lg:block'>
                        Search
                      </a>

                      <div className='flex items-center lg:ml-8'>
                        {/* Help */}
                        <a href='#' className='p-2 text-white lg:hidden'>
                          <span className='sr-only'>Help</span>
                          <QuestionMarkCircleIcon className='w-6 h-6' aria-hidden='true' />
                        </a>
                        <a href='#' className='hidden text-sm font-medium text-white lg:block'>
                          Help
                        </a>

                        {/* Cart */}
                        <div className='flow-root ml-4 lg:ml-8'>
                          <Link to='/cart' className='flex items-center p-2 -m-2 group'>
                            <ShoppingBagIcon
                              className='flex-shrink-0 w-6 h-6 text-white'
                              aria-hidden='true'
                            />
                            <span className='ml-2 text-sm font-medium text-white'>
                              {cartCount === 0 ? '0' : `${cartCount} items`}
                            </span>
                            <span className='sr-only'>items in cart, view bag</span>
                          </Link>
                        </div>
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
