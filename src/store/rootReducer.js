import { combineReducers } from 'redux'
// import userReducer from './user/userReducer'
import categoriesReducer from './categories/categoryReducer'
import userReducer from './user/userSlice'

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
})
