import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
