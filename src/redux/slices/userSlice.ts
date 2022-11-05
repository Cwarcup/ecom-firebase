import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  auth,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebaseUtils'
import { getRedirectResult, User } from 'firebase/auth'
import type { SignInFormFieldsType, SignUpFormFieldsType } from '../../types/userTypes'

// async function used to sign in user with email and password

export const signInUser = createAsyncThunk(
  'user/signInUser',
  async ({ email, password }: SignInFormFieldsType) => {
    const response = await signInAuthUserWithEmailAndPassword(email, password)
    return response
  },
)

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
  async ({ email, password, displayName }: SignUpFormFieldsType) => {
    const response = await createAuthUserWithEmailAndPassword(email, password)

    if (response) {
      await createUserDocumentFromAuth(response.user, { displayName })
    }
    // create user document in firestore database

    return response
  },
)

// initial type for the user state
type UserState = {
  currentUser: any
  status: 'idle' | 'loading' | 'failed'
  error: string | null | undefined
}

const initialState: UserState = {
  currentUser: null,
  status: 'idle',
  error: null,
}

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.currentUser = action.payload
    },
    signOutUser: (state) => {
      state.currentUser = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.status = 'idle'
      state.currentUser = action.payload
    })
    builder.addCase(signInUser.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    builder.addCase(signInGoogleRedirect.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(signInGoogleRedirect.fulfilled, (state, action) => {
      state.status = 'idle'
      state.currentUser = action.payload
    })
    builder.addCase(signInGoogleRedirect.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    builder.addCase(signUpUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.status = 'idle'
      state.currentUser = action.payload
    })
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  },
})

export const { setUser, signOutUser } = userSlice.actions

export const currentUserSelector = (state: any) => state.user.currentUser
export const userStatusSelector = (state: any) => state.user.status

export default userSlice.reducer
