import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Stripe from 'stripe'

export const getCards = createAsyncThunk(
  'api/cards/',
  async (customerId: string) => {
    const response = await fetch(`/api/cards/${customerId}`)
    const cards = await response.json()
    return cards as Stripe.Card[]
  }
)

export const removeCard = createAsyncThunk(
  'api/cards/remove',
  async ({ customerId, sourceId }: { customerId: string, sourceId: string }) => {
    const response = await fetch(`/api/cards/${customerId}`, {
      method: "DELETE",
      body: JSON.stringify({
        sourceId
      })
    })
    const card = await response.json()
    return card as Stripe.Card
  }
)

export const attachCard = createAsyncThunk(
  'api/cards/add',
  async ({ customerId, cardToken }: { customerId: string, cardToken: string }) => {
    const response = await fetch(`/api/cards/${customerId}`, {
      method: "PUT",
      body: JSON.stringify({
        cardToken
      })
    })
    const card = await response.json()
    console.log(cards)
    return card
  }
)

export const cards = createSlice({
  name: 'cards',
  initialState: {
    cardsList: [],
    loading: {
      addingCard: false,
      removingCard: false,
      changingDefaultCard: false,
    }
  },
  reducers: {
  },
  extraReducers: (builder) =>  {
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.cardsList = action.payload
    })
    builder.addCase(removeCard.fulfilled, (state, action) => {
      state.cardsList = state.cardsList.filter(card => action.payload.id !== card.id)
    })
    builder.addCase(attachCard.fulfilled, (state, action) => {
      console.log("payload", action.payload)
      state.cardsList = [
        ...state.cardsList,
        action.payload
      ]
    })
  }
})

export const { } = cards.actions

export default cards.reducer
