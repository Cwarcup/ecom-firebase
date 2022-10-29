import { createContext, useState, useEffect } from 'react'

import { getCategoriesAndDocuments } from '../utils/firebase/firebaseUtils'

export const CategoriesContext = createContext({
  categories: {},
})

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({})

  useEffect(() => {
    const fetchProducts = async () => {
      const categoryMap = await getCategoriesAndDocuments()

      // used to filter out the categories that are not in the CATEGORIES_KEYS array
      const CATEGORIES_KEYS = ['jackets', 'mens', 'sneakers', 'womens', 'hats']

      const fixedCategoryData = Object.keys(categoryMap).reduce((acc, key) => {
        if (CATEGORIES_KEYS.includes(key)) {
          acc[key] = categoryMap[key]
        }
        return acc
      }, {})

      setCategories(fixedCategoryData)
    }

    fetchProducts()
  }, [])

  const value = { categories }

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
