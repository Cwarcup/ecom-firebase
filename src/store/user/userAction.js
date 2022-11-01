import { createAction } from '../../utils/reducer'
import USER_ACTION_TYPES from './userActionTypes'

// action creator
export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_USER, user)

// this only creates the action object
// we still need to dispatch it to the reducer
