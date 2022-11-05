import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { CartItemType } from '../../types/cartTypes'

// define the type for the slice state
type CartState = {
  cartItems: CartItemType[]
  cartCount: number
  cartTotal: number
}

const initialState: CartState = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

// !! cart helper functions
const addCartItem = (cartItems: CartItemType[], productToAdd: CartItemType) => {
  const existingCartItem = cartItems.find(
    (cartItem: CartItemType) => cartItem.id === productToAdd.id,
  )
  if (existingCartItem) {
    return cartItems.map((cartItem: CartItemType) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems: CartItemType[], cartItemToRemove: CartItemType) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem: CartItemType) => cartItem.id === cartItemToRemove.id,
  )

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem: CartItemType) => cartItem.id !== cartItemToRemove.id)
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem: CartItemType) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  )
}

const clearCartItem = (cartItems: CartItemType[], cartItemToClear: CartItemType) => {
  return cartItems.filter((cartItem: CartItemType) => cartItem.id !== cartItemToClear.id)
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItemType>) => {
      state.cartItems = addCartItem(state.cartItems, action.payload)
      state.cartCount = state.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
      state.cartTotal = state.cartItems.reduce(
        (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
        0,
      )
    },
    removeItemFromCart: (state, action: PayloadAction<CartItemType>) => {
      state.cartItems = removeCartItem(state.cartItems, action.payload)
      state.cartCount = state.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
      state.cartTotal = state.cartItems.reduce(
        (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
        0,
      )
    },
    clearItemFromCart: (state, action: PayloadAction<CartItemType>) => {
      state.cartItems = clearCartItem(state.cartItems, action.payload)
      state.cartCount = state.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
      state.cartTotal = state.cartItems.reduce(
        (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
        0,
      )
    },
  },
})

export const { addItemToCart, removeItemFromCart, clearItemFromCart } = cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.cartItems
export const selectCartCount = (state: RootState) => state.cart.cartCount
export const selectCartTotal = (state: RootState) => state.cart.cartTotal

export default cartSlice.reducer
