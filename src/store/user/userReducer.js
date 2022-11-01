import USER_ACTION_TYPES from './userActionTypes'

const INITIAL_USER_STATE = {
  currentUser: null,
}

// create a reducer function to update the state
const userReducer = (state = INITIAL_USER_STATE, action) => {
  // we always have a type and a payload on the action
  const { type, payload } = action

  // use a switch statement to handle different actions
  switch (type) {
    case USER_ACTION_TYPES.SET_USER:
      return {
        ...state, // spread the current state
        currentUser: payload,
      }
    default:
      // return current state if no action is matched
      // important for rerenders
      return state
  }
}

export default userReducer
