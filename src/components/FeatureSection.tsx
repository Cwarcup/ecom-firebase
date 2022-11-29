import { Link } from 'react-router-dom'

type Props = {
  title: string
  description: string
  itemType: string
}

const FeatureSection = ({ title, description, itemType }: Props) => {
  return (
    <section
      aria-labelledby='comfort-heading'
      className='px-4 py-24 mx-auto max-w-7xl sm:py-32 sm:px-6 lg:px-8'
    >
      <div className='relative overflow-hidden rounded-lg'>
        <div className='absolute inset-0'>
          <img
            src='https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-02.jpg'
            alt=''
            className='object-cover object-center w-full h-full'
          />
        </div>
        <div className='relative px-6 py-32 bg-gray-900 bg-opacity-75 sm:py-40 sm:px-12 lg:px-16'>
          <div className='relative flex flex-col items-center max-w-3xl mx-auto text-center'>
            <h2
              id='comfort-heading'
              className='text-3xl font-bold tracking-tight text-white sm:text-4xl'
            >
              {title}
            </h2>
            <p className='mt-3 text-xl text-white'>{description}</p>
            <Link
              to={'/shop/hats'}
              className='block w-full px-8 py-3 mt-8 text-base font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-100 sm:w-auto'
            >
              Shop {itemType}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
