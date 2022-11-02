import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

// !! cart helper functions
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  )
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.cartItems = addCartItem(state.cartItems, action.payload)
      state.cartCount = state.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
      state.cartTotal = state.cartItems.reduce(
        (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
        0,
      )
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = removeCartItem(state.cartItems, action.payload)
      state.cartCount = state.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
      state.cartTotal = state.cartItems.reduce(
        (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
        0,
      )
    },
    clearItemFromCart: (state, action) => {
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

export default cartSlice.reducer
