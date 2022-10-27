import { createContext, useState } from 'react'
import shopData from '../data/shop-data.json'

export const ProductsContext = createContext({
  products: null,
  setProducts: () => null,
})

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(shopData)

  const value = { products }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
