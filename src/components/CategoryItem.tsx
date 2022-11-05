import { CategoryItemType } from '../types/categoryTypes'

type CategoryItemProps = {
  category: CategoryItemType
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  const { name, imageUrl } = category
  return (
    <>
      <article className='relative'>
        <div className='aspect-square overflow-hidden'>
          <img
            className='group-hover:scale-125 h-full w-full object-cover transition-all duration-300'
            src={imageUrl}
            alt='clothing'
          />
        </div>

        <div className='mt-4 flex items-start justify-between'>
          <div className=''>
            <h3 className='text-xs font-semibold sm:text-sm md:text-base'>
              <a href='#' title='' className='cursor-pointer'>
                {name}
              </a>
            </h3>
          </div>
        </div>
      </article>
    </>
  )
}

export default CategoryItem
