import { CategoryItemType } from './categoryTypes'

// for single item in the cartItems array
// type ItemInCartTypeQ = {
//   id: number
//   imageUrl: string
//   name: string
//   price: number
//   quantity?: number
// }
// type ItemInCartTypeU = {
//   id: number
//   imageUrl: string
//   name: string
//   price: number
//   quantity?: any
// }

export type CartItemType = {
  quantity?: number | any
} & CategoryItemType

// for single item in the cartItems array

// export type ItemInCartType = ItemInCartTypeQ | ItemInCartTypeU
