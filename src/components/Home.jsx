import Directory from './Directory'
import categoryData from '../data/categories.json'

const Home = () => {
  return <Directory categories={categoryData} />
}

export default Home
