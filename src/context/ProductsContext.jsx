import { createContext, useState, useEffect } from 'react'

import { getCategoriesAndDocuments } from '../utils/firebase/firebaseUtils'

export const ProductsContext = createContext({
  products: [],
})

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getCategoriesAndDocuments()
      console.log('products', products)
    }

    fetchProducts()
  }, [])

  const value = { products }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
