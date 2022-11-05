export type CategoryType = {
  name: string
  id: number
  imageUrl: string
  price: number
}

export interface CategoriesMapType {
  [key: string]: CategoryType
}

export type Category = {
  title: string
  imageUrl: string
  items: CategoryType[]
}

export default CategoryType
