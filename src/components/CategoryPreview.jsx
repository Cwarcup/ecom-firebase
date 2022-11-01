import { Routes, Route, Link } from 'react-router-dom'
import CategoryPage from './CategoryPage'
import { useEffect } from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase/firebaseUtils'
import { setCategoriesMap } from '../store/categories/categoryAction'
import { useDispatch } from 'react-redux'

// components displays the categories in the database

// displays the categories in the database as links
// accessed at /shop
const CategoryPreview = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      const categoryMap = await getCategoriesAndDocuments()

      // used to filter out the categories that are not in the CATEGORIES_KEYS array
      const CATEGORIES_KEYS = ['jackets', 'mens', 'sneakers', 'womens', 'hats']

      const fixedCategoryData = Object.keys(categoryMap).reduce((acc, key) => {
        if (CATEGORIES_KEYS.includes(key)) {
          acc[key] = categoryMap[key]
        }
        return acc
      }, {})

      dispatch(setCategoriesMap(fixedCategoryData))
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
      href: '#',
    },
    {
      name: 'Jackets',
      description: 'Rain or shine, we have you covered',
      imageSrc: 'https://i.ibb.co/N71k1ML/grey-jean-jacket.png',
      imageAlt:
        'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
    },
    {
      name: 'Mens',
      description: 'Nothing but the best for the fellas',
      imageSrc: 'https://i.ibb.co/xJS0T3Y/camo-vest.png',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
    {
      name: 'Hats',
      description: 'Cover your receding hairline',
      imageSrc: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
    {
      name: 'Womens',
      description: 'We also got you covered',
      imageSrc: 'https://i.ibb.co/7CQVJNm/blue-tank.png',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
  ]

  // clicking a category will take you to the category shop page
  const Preview = () => {
    return (
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32'>
          <h2 className='text-2xl font-bold text-gray-900'>Collections</h2>

          <div className='mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
            {categoryNames.map((item, index) => (
              <div key={index} className='group relative'>
                <div className='relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1'>
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    className='h-full w-full object-cover object-center'
                  />
                </div>
                <h3 className='mt-6 text-sm text-gray-500'>
                  <Link to={`${item.name.toLowerCase()}`}>
                    <span className='absolute inset-0' />
                    {item.name}
                  </Link>
                </h3>
                <p className='text-base font-semibold text-gray-900'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
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
