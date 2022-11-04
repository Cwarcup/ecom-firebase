import { createSlice } from '@reduxjs/toolkit'
import { CategoriesMapType } from '../../types/CategoryType'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// initialState is an object containing arrays of objects

// the arrays contains objects that represent the categories
// each category object has a name, id, imageUrl, and price

type CategoriesState = {
  categoriesMap: CategoriesMapType
}

// initialState will be an empty object, but can also be CategoryType[]
const initialState: CategoriesState = {
  categoriesMap: {},
}

export const categoriesSlice = createSlice({
  name: 'categoriesMap',
  initialState,
  reducers: {
    setCategoriesMap: (state, action: PayloadAction<CategoriesMapType>) => {
      state.categoriesMap = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCategoriesMap } = categoriesSlice.actions

// selector to get the categoriesMap from the store
export const selectCategoriesMap = (state: RootState) => state.categories.categoriesMap

export default categoriesSlice.reducer
