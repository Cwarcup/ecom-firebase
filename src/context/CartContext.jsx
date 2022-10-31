import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearCart: () => {},
  cartCount: 0,
  cartTotal: 0,
})

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    // calculate number of items in cart
    const cartItemsCount = cartItems.reduce(
      (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
      0,
    )
    setCartCount(cartItemsCount)

    // calculate total price of items in cart
    const newCartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setCartTotal(newCartTotal)
  }, [cartItems])

  //!! helper functions for cart
  // helper function to add item to cart
  const addCartItem = (cartItems, itemToAdd) => {
    // find if cart item already exists
    const existingItem = cartItems.find((item) => item.id === itemToAdd.id)

    // if found, increment quantity
    if (existingItem) {
      // return new array with updated item quantity and existing items
      return cartItems.map((item) =>
        item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item,
      )
    }

    // if not found, add new item with quantity of 1
    // return new array with new item and existing items
    return [...cartItems, { ...itemToAdd, quantity: 1 }]
  }

  // helper function to remove item from cart
  const removeCartItem = (cartItems, itemToRemove) => {
    // find if cart item already exists
    const existingItem = cartItems.find((item) => item.id === itemToRemove.id)

    // if found, decrement quantity
    if (existingItem.quantity > 1) {
      // return new array with updated item quantity and existing items
      return cartItems.map((item) =>
        item.id === itemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item,
      )
    }

    // if quantity is 1, remove item from cart
    return cartItems.filter((item) => item.id !== itemToRemove.id)
  }
  // pass ability to add item to cart to context
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  // pass ability to remove item from cart to context
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove))
  }

  // pass ability to set a cart item quantity to 0
  const clearItemFromCart = (productToClear) => {
    setCartItems(cartItems.filter((item) => item.id !== productToClear.id))
  }

  // values/functions to pass to context
  const value = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    cartCount,
    cartSubtotal: cartTotal,
    clearItemFromCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// shape of the cart object
// {
//   id: number,
//   name: string,
//   price: number,
//   quantity: number,   // * we need to add this
//   imageUrl: string,
// }
