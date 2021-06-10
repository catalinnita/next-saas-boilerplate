import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { updateUserById } from "../../utils/auth0";
import { RootState } from '../store';

export const updateProfile = createAsyncThunk(
  'updateProfile',
  async (userDetails: Record<string, any>, { getState }) => {
    const { user } = getState() as RootState
    const { token, id } = user
    console.log({user})
    return await updateUserById(token, id, {
      ...userDetails
    })
  }
)

export const updatePassword = createAsyncThunk(
  'updatePassword',
  async (userDetails: Record<string, any>, { getState }) => {
    const { user } = getState() as RootState
    const { token, id } = user
    return await updateUserById(token, id, {
      ...userDetails
    })
  }
)

export const user = createSlice({
  name: 'user',
  initialState: {
    token: null,
    id: null,
    email: null,
    username: null,
    name: null,
    status: "FREE",
    loading: {
      updatingProfile: false,
      updatingPassword: false,
    }
  },
  reducers: {
    setUser: (state, action) => {
      console.log("payload", action.payload)
      state.id = action.payload.user_id
      state.email = action.payload.email
      state.username = action.payload.name
      state.name = action.payload.nickname
      state.status = action.payload.user_metadata?.userStatus
    },
    setProfile: (state, action) => {
      state.email = action.payload.email
      state.name = action.payload.nickname
    },
    setToken: (state, action) => {
      state.token = action.payload.access_token
    },
    upgrade: (state) => {
      state.status = "PREMIUM"
    },
    downgrade: (state) => {
      state.status = "FREE"
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      user.caseReducers.setProfile(state, action)
    })
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      // user.caseReducers.setProfile(state, action)
    })
  }
})

export const { upgrade, downgrade, setUser, setToken } = user.actions

export default user.reducer
