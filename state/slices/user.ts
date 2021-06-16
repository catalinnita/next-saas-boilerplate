import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { updateUserById } from "../../utils/auth0";
import { RootState } from '../store';
import { validateEmail, validateNickname, Error, validatePassword, verifyPasswords } from "../../utils/formValidation"


export const updateProfile = createAsyncThunk(
  'updateProfile',
  async (userDetails: Record<string, any>, { getState }) => {
    const { user } = getState() as RootState
    const { token, id } = user
    const fetchedUser = await updateUserById(token, id, {
      ...userDetails
    })
    return fetchedUser
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
    password: null,
    password1: null,
    loading: {
      profile: false,
      password: false,
    },
    error: {
      profile: false,
      password: false,
    },
    success: {
      profile: false,
      password: false,
    },
    validation: {
      email: false,
      nickname: false,
      password: false,
      password1: false
    }
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.user_id
      state.email = action.payload.email
      state.username = action.payload.name
      state.name = action.payload.nickname
      state.status = action.payload.user_metadata?.userStatus
    },
    setProfile: (state, action) => {
      if (action.payload.email && state.email !== action.payload.email) {
        state.email = action.payload.email
        state.validation.email = validateEmail(action.payload.email)
      }
      if (action.payload.nickname && state.name !== action.payload.nickname) {
        state.name = action.payload.nickname
        state.validation.nickname = validateNickname(action.payload.nickname)
      }
    },
    setPassword: (state, action) => {
      if (action.payload.password && state.password !== action.payload.password) {
        state.password = action.payload.password
        state.validation.password = validatePassword(action.payload.password)
      }
      if (action.payload.password1 && state.password1 !== action.payload.password1) {
        state.password1 = action.payload.password1
        state.validation.password1 = verifyPasswords(state.password, action.payload.password1)
      }
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
    builder.addCase(updateProfile.pending, (state, action) => {
      state.success.profile = false
      state.error.profile = false
      state.validation.email = false
      state.validation.nickname = false
      state.loading.profile = true
    })
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      user.caseReducers.setProfile(state, action)
      state.success.profile = "Updated"
      state.loading.profile = false
    })
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.error.profile = action.error.message
      state.loading.profile = false
    })

    builder.addCase(updatePassword.pending, (state, action) => {
      state.success.password = false
      state.error.password = false
      state.validation.password = false
      state.validation.password1 = false
      state.loading.password = true
    })
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.success.password = "Updated"
      state.loading.password = false
    })
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.error.password = action.error.message
      state.loading.password = false
    })
  }
})

export const { upgrade, downgrade, setUser, setToken, setProfile, setPassword} = user.actions

export default user.reducer
