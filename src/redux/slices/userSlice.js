import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  auth,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebaseUtils'
import { getRedirectResult } from 'firebase/auth'

// async function used to sign in user with email and password
export const signInUser = createAsyncThunk('user/signInUser', async ({ email, password }) => {
  const response = await signInAuthUserWithEmailAndPassword(email, password)
  return response
})

// async function used to sign in user with google redirect method
export const signInGoogleRedirect = createAsyncThunk(
  'user/signInGoogleRedirect',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRedirectResult(auth)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

// sign up user with email and password
// must create the user document in firestore, returning the auth user
// and then sign in the using the auth user returned from the createUserDocumentFromAuth function
export const signUpUser = createAsyncThunk(
  'user/signUpUser',
  async ({ email, password, displayName }) => {
    const response = await createAuthUserWithEmailAndPassword(email, password)

    // create user document in firestore database
    await createUserDocumentFromAuth(response.user, { displayName })

    return response
  },
)

const initialState = {
  currentUser: null,
  status: 'idle',
  error: null,
}

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
    },
    signOutUser: (state) => {
      state.currentUser = null
    },
  },
  extraReducers: {
    [signInUser.pending]: (state) => {
      state.status = 'loading'
    },
    [signInUser.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.currentUser = action.payload
    },
    [signInUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [signInGoogleRedirect.pending]: (state) => {
      state.status = 'loading'
    },
    [signInGoogleRedirect.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.currentUser = action.payload
    },
    [signInGoogleRedirect.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [signUpUser.pending]: (state) => {
      state.status = 'loading'
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.currentUser = action.payload
    },
    [signUpUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const { setUser, signOutUser } = userSlice.actions

export default userSlice.reducer
