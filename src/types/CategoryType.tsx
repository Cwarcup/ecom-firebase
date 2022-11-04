export type CategoryType = {
  name: string
  id: number
  imageUrl: string
  price: number
}

export interface CategoriesMapType {
  [key: string]: CategoryType
}

export default CategoryType
