import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Stripe from "stripe"

export const createCustomer = createAsyncThunk("api/customers/add", async (email: string) => {
  const response = await fetch(`/api/customers/${email}`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  })
  const customer = await response.json()
  return customer as Stripe.Customer
})

export const getCustomer = createAsyncThunk("api/customers/", async (email: string) => {
  const response = await fetch(`/api/customers/${email}`)
  const customer = await response.json()
  return customer as Stripe.Customer
})

export const updateDefaultCard = createAsyncThunk(
  "api/cards/setDefault",
  async ({ customerId, sourceId }: { customerId: string; sourceId: string }) => {
    const response = await fetch(`/api/cards/${customerId}`, {
      method: "PUT",
      body: JSON.stringify({
        sourceId,
      }),
    })
    const customer = await response.json()
    return customer
  }
)

export interface customerState {
  id: string
  defaultCardId: string
  loading: {
    creatingCustomer: boolean
  }
}

const initialState = {
  id: undefined,
  defaultCardId: undefined,
  loading: {
    creatingCustomer: false,
  },
} as customerState

export const customer = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setDefaultCard: (state, action) => {
      state.defaultCardId = action.payload.default_source
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.id = action.payload.id
      state.defaultCardId = action.payload.default_source?.toString()
    })

    builder.addCase(getCustomer.rejected, (state, action) => {
      state.id = null
    })

    builder.addCase(updateDefaultCard.fulfilled, (state, action) => {
      customer.caseReducers.setDefaultCard(state, action)
    })

    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.id = action.payload.id
    })
  },
})

export const { setDefaultCard } = customer.actions

export default customer.reducer
