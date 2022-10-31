import { createContext, useEffect, useState, useReducer } from 'react'

import { createAction } from '../utils/reducer'

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }
}

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearCart: () => {},
  cartCount: 0,
  cartTotal: 0,
})

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const [{ cartCount, cartTotal, cartItems }, dispatch] = useReducer(cartReducer, INITIAL_STATE)

  const updateCartItemsReducer = (cartItems) => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)

    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0,
    )

    const payload = {
      cartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    }

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload))
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    updateCartItemsReducer(newCartItems)
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([])
//   const [cartCount, setCartCount] = useState(0)
//   const [cartTotal, setCartTotal] = useState(0)

//   useEffect(() => {
//     // calculate number of items in cart
//     const cartItemsCount = cartItems.reduce(
//       (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
//       0,
//     )
//     setCartCount(cartItemsCount)

//     // calculate total price of items in cart
//     const newCartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
//     setCartTotal(newCartTotal)
//   }, [cartItems])

//   //!! helper functions for cart
//   // helper function to add item to cart
//   const addCartItem = (cartItems, itemToAdd) => {
//     // find if cart item already exists
//     const existingItem = cartItems.find((item) => item.id === itemToAdd.id)

//     // if found, increment quantity
//     if (existingItem) {
//       // return new array with updated item quantity and existing items
//       return cartItems.map((item) =>
//         item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item,
//       )
//     }

//     // if not found, add new item with quantity of 1
//     // return new array with new item and existing items
//     return [...cartItems, { ...itemToAdd, quantity: 1 }]
//   }

//   // helper function to remove item from cart
//   const removeCartItem = (cartItems, itemToRemove) => {
//     // find if cart item already exists
//     const existingItem = cartItems.find((item) => item.id === itemToRemove.id)

//     // if found, decrement quantity
//     if (existingItem.quantity > 1) {
//       // return new array with updated item quantity and existing items
//       return cartItems.map((item) =>
//         item.id === itemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item,
//       )
//     }

//     // if quantity is 1, remove item from cart
//     return cartItems.filter((item) => item.id !== itemToRemove.id)
//   }
//   // pass ability to add item to cart to context
//   const addItemToCart = (productToAdd) => {
//     setCartItems(addCartItem(cartItems, productToAdd))
//   }

//   // pass ability to remove item from cart to context
//   const removeItemFromCart = (productToRemove) => {
//     setCartItems(removeCartItem(cartItems, productToRemove))
//   }

//   // pass ability to set a cart item quantity to 0
//   const clearItemFromCart = (productToClear) => {
//     setCartItems(cartItems.filter((item) => item.id !== productToClear.id))
//   }

//   // values/functions to pass to context
//   const value = {
//     cartItems,
//     addItemToCart,
//     removeItemFromCart,
//     cartCount,
//     cartSubtotal: cartTotal,
//     clearItemFromCart,
//   }

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>
// }

// shape of the cart object
// {
//   id: number,
//   name: string,
//   price: number,
//   quantity: number,   // * we need to add this
//   imageUrl: string,
// }
