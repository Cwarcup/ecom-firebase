import CategoryItem from './CategoryItem'
import type { CategoryItemType } from '../types/categoryTypes'

type DirectoryProps = {
  categories: CategoryItemType[]
}

const Directory = ({ categories }: DirectoryProps) => {
  return (
    <div className='mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-5 lg:gap-4'>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default Directory
