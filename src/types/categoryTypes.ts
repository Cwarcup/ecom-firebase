export type CategoryItemType = {
  name: string
  id: number
  imageUrl: string
  price: number
}

export interface CategoriesMapType {
  [key: string]: CategoryItemType
}

export type Category = {
  title: string
  imageUrl: string
  items: CategoryItemType[]
}
