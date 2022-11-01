import { combineReducers } from 'redux'
// import userReducer from './user/userReducer'
// import categoriesReducer from './categories/categoryReducer'
import userReducer from './slices/userSlice'
import categoriesReducer from './slices/categoriesSlice'

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
})
