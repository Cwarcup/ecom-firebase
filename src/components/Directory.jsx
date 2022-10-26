import CategoryItem from '../components/CategoryItem'

const Directory = ({ categories }) => {
  return (
    <div className='mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-5 lg:gap-4'>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default Directory
