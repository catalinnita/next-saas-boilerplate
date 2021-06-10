import { createSlice } from '@reduxjs/toolkit'
import getSymbolFromCurrency from 'currency-symbol-map'
import { getDate } from '../../../utils/getDate'
import { initialState } from './state'
import { getSubscription, createInitialSubscription, activateSubscription, cancelSubscription } from './async'

export const subscription = createSlice({
  name: 'subscription',
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

    builder.addCase(createInitialSubscription.fulfilled, (state, action) => {
      subscription.caseReducers.setSubscriptionInfo(state, action)
    })

    builder.addCase(activateSubscription.fulfilled, (state, action) => {
      console.log("activateSubscription", action)
      subscription.caseReducers.setSubscriptionInfo(state, action)
    })

    builder.addCase(cancelSubscription.fulfilled, (state, action) => {
      state.status = action.payload.status
    })
  },
})

export const { setSubscriptionInfo } = subscription.actions

export default subscription.reducer
