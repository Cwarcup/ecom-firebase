import categoryReducer from './slices/categoriesSlice'
import userReducer from './slices/userSlice'
import cartReducer from './slices/cartSlice'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  categories: categoryReducer,
  user: userReducer,
  cart: cartReducer,
})

export default rootReducer
