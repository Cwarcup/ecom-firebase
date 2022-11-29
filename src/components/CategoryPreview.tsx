import { Routes, Route, Link } from 'react-router-dom'
import CategoryPage from './CategoryPage'
import { useEffect } from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase/firebaseUtils'
import { setCategoriesMap } from '../redux/slices/categoriesSlice'
import { useDispatch } from 'react-redux'

// displays the categories in the database as links
// accessed at /shop
const CategoryPreview = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      const categoryMap = await getCategoriesAndDocuments()

      dispatch(setCategoriesMap(categoryMap))
    }

    fetchProducts()
  }, [])

  const categoryNames = [
    {
      name: 'Sneakers',
      description: 'Sneakers for all occasions',
      imageSrc: 'https://i.ibb.co/0s3pdnc/adidas-nmd.png',
      imageAlt:
        'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    },
    {
      name: 'Jackets',
      description: 'Rain or shine, we have you covered',
      imageSrc: 'https://i.ibb.co/N71k1ML/grey-jean-jacket.png',
      imageAlt:
        'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    },
    {
      name: 'Mens',
      description: 'Nothing but the best for the fellas',
      imageSrc: 'https://i.ibb.co/xJS0T3Y/camo-vest.png',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    },
    {
      name: 'Hats',
      description: 'Cover your receding hairline',
      imageSrc: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    },
    {
      name: 'Womens',
      description: 'We also got you covered',
      imageSrc: 'https://i.ibb.co/7CQVJNm/blue-tank.png',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    },
  ]

  // clicking a category will take you to the category shop page
  const Preview = () => {
    return (
      <section
        aria-labelledby='category-heading'
        className='pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8'
      >
        <div className='px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0'>
          <h2 id='category-heading' className='text-2xl font-bold tracking-tight text-gray-900'>
            Shop by Category
          </h2>
        </div>

        <div className='flow-root mt-4'>
          <div className='-my-2'>
            <div className='box-content relative py-2 overflow-x-auto h-80 xl:overflow-visible'>
              <div className='absolute flex px-4 space-x-8 min-w-screen-xl sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0'>
                {categoryNames.map((item) => (
                  <Link
                    key={item.name}
                    to={`shop/${item.name.toLowerCase()}`}
                    className='relative flex flex-col w-56 p-6 overflow-hidden rounded-lg h-80 hover:opacity-75 xl:w-auto'
                  >
                    <span aria-hidden='true' className='absolute inset-0'>
                      <img
                        src={item.imageSrc}
                        alt=''
                        className='object-cover object-center w-full h-full'
                      />
                    </span>
                    <span
                      aria-hidden='true'
                      className='absolute inset-x-0 bottom-0 opacity-50 h-2/3 bg-gradient-to-t from-gray-800'
                    />
                    <span className='relative mt-auto text-xl font-bold text-center text-white'>
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <Routes>
      <Route index element={<Preview />} />
      <Route path=':category' element={<CategoryPage />} />
    </Routes>
  )
}

export default CategoryPreview
