import Stripe from 'stripe'
import appConfig from '../../../config/appConfig'
import { createAsyncThunk } from '@reduxjs/toolkit'


export const getSubscription = createAsyncThunk(
  'api/subscriptions/',
  async (customerId: string) => {
    const response = await fetch(`/api/subscriptions/${customerId}`)
    const subscription = await response.json()
    return subscription as Stripe.Subscription
  }
)

export const createInitialSubscription = createAsyncThunk(
  'api/subscriptions/add',
  async (customerId: string) => {
    const response = await fetch(`/api/subscriptions/${customerId}`, {
      method: "POST",
      body: JSON.stringify({
        trialPeriodDays: appConfig.trialPeriodDays,
      })
    })
    const subscription = await response.json()
    return subscription as Stripe.Subscription
  }
)

export const activateSubscription = createAsyncThunk(
  'api/subscriptions/activate',
  async (customerId: string) => {
    const response = await fetch(`/api/subscriptions/${customerId}`, {
      method: "POST",
      body: JSON.stringify({
        trialPeriodDays: 0,
      })
    })
    const subscription = await response.json()
    return subscription as Stripe.Subscription
  }
)

export const cancelSubscription = createAsyncThunk(
  'api/subscriptions/cancel',
  async (subscriptionId: string) => {
    const response = await fetch(`/api/subscriptions/`, {
      method: "DELETE",
      body: JSON.stringify({
        subscriptionId
      })
    })
    const subscription = await response.json()
    return subscription as Stripe.Subscription
  }
)
