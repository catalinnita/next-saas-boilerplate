import Stripe from "stripe"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import getSymbolFromCurrency from "currency-symbol-map"
import { RootState } from "../store"
import appConfig from "../../config/appConfig"
import { getDate } from "../../utils/getDate"

export const getSubscription = createAsyncThunk(
  "api/subscriptions/",
  async (customerId: string) => {
    const response = await fetch(`/api/subscriptions/${customerId}`)
    const subscription = await response.json()

    return subscription as Stripe.Subscription
  }
)

export const createSubscription = createAsyncThunk("api/subscriptions/add", async (_, thunkApi) => {
  const {
    customer: { id },
  } = thunkApi.getState() as RootState
  const response = await fetch(`/api/subscriptions/${id}`, {
    method: "POST",
    body: JSON.stringify({
      trialPeriodDays: appConfig.trialPeriod,
    }),
  })
  const subscription = await response.json()
  return subscription as Stripe.Subscription
})

export const activateSubscription = createAsyncThunk(
  "api/subscriptions/activate",
  async (_, thunkApi) => {
    const {
      customer: { id },
    } = thunkApi.getState() as RootState
    const response = await fetch(`/api/subscriptions/${id}`, {
      method: "POST",
      body: JSON.stringify({
        trialPeriodDays: 0,
      }),
    })
    const subscription = await response.json()
    return subscription as Stripe.Subscription
  }
)

export const cancelSubscription = createAsyncThunk(
  "api/subscriptions/cancel",
  async (subscriptionId: string) => {
    const response = await fetch("/api/subscriptions/", {
      method: "DELETE",
      body: JSON.stringify({
        subscriptionId,
      }),
    })
    const subscription = await response.json()
    return subscription as Stripe.Subscription
  }
)

export interface subscriptionState {
  id: string
  name: string
  price: string
  currencySymbol: string
  period: "day" | "month" | "week" | "year" | null
  createdDate: string | null
  trialEnd: string | null
  invoiceDate: string | null
  status:
    | "active"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "past_due"
    | "trialing"
    | "unpaid"
    | "none"
    | null
  loading: {
    creating: boolean
    cancelling: boolean
    activating: boolean
  }
}

export const initialState = {
  id: "",
  name: "SCRAMBLED DATA PREMIUM",
  price: "",
  currencySymbol: "",
  period: null,
  createdDate: null,
  trialEnd: null,
  invoiceDate: null,
  status: null,
  loading: {
    creating: false,
    cancelling: false,
    activating: false,
  },
} as subscriptionState

export const subscription = createSlice({
  name: "subscription",
  initialState,

  reducers: {
    setSubscriptionInfo: (state, action) => {
      state.id = action.payload.id
      state.status = action.payload.status
      state.createdDate = getDate(action.payload.created)
      state.trialEnd = getDate(action.payload.trial_end)
      state.invoiceDate = getDate(action.payload.current_period_end)
      state.currencySymbol = `${getSymbolFromCurrency(action.payload.items.data[0].price.currency)}`
      state.price = `${action.payload.items.data[0].price.unit_amount / 100}`
      state.period = action.payload.items.data[0].price.recurring.interval
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getSubscription.fulfilled, (state, action) => {
      subscription.caseReducers.setSubscriptionInfo(state, action)
    })

    builder.addCase(createSubscription.fulfilled, (state, action) => {
      subscription.caseReducers.setSubscriptionInfo(state, action)
    })

    builder.addCase(activateSubscription.fulfilled, (state, action) => {
      subscription.caseReducers.setSubscriptionInfo(state, action)
    })

    builder.addCase(cancelSubscription.fulfilled, (state, action) => {
      state.status = action.payload.status
    })
  },
})

export const { setSubscriptionInfo } = subscription.actions

export default subscription.reducer
