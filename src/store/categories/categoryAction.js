import { createAction } from '../../utils/reducer'
import CATEGORIES_ACTION_TYPES from './categoriesActionTypes'

// action creator
export const setCategoriesMap = (categoriesMap) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap)
