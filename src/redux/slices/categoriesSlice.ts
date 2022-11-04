import { createSlice } from '@reduxjs/toolkit'

// initialState is an object containing arrays of objects

// the arrays contains objects that represent the categories
// each category object has a name, id, imageUrl, and price
type CategoryType = {
  name: string
  id: number
  imageUrl: string
  price: number
}

type CategoriesState = {
  categoriesMap: {
    [key: string]: CategoryType
  }
}

// initialState will be an empty object, but can also be CategoryType[]
const initialState: CategoriesState = {
  categoriesMap: {},
}

export const categoriesSlice = createSlice({
  name: 'categoriesMap',
  initialState,
  reducers: {
    setCategoriesMap: (state, action) => {
      state.categoriesMap = action.payload
    },
  },
})

export const { setCategoriesMap } = categoriesSlice.actions

export default categoriesSlice.reducer
