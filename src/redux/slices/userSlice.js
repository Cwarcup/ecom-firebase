import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  auth,
  // createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebaseUtils'
import { getRedirectResult } from 'firebase/auth'

export const signInUser = createAsyncThunk('user/signInUser', async ({ email, password }) => {
  const response = await signInAuthUserWithEmailAndPassword(email, password)
  return response
})

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

const initialState = {
  currentUser: null,
  error: null,
}

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    builder.addCase(signInUser.rejected, (state, action) => {
      state.currentUser = null
      state.error = action.payload
    })
    builder.addCase(signInGoogleRedirect.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    builder.addCase(signInGoogleRedirect.rejected, (state, action) => {
      state.currentUser = null
      state.error = action.payload
    })
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
