import Directory from './Directory'
import categoryData from '../data/categories.json'

const Home = () => {
  return (
    <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
      <Directory categories={categoryData} />
    </div>
  )
}

export default Home
