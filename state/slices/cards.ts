import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Stripe from "stripe"
import { RootState } from "../store"

export const getCards = createAsyncThunk(
  "api/cards/",
  async ({ customerId }: { customerId: string }) => {
    const response = await fetch(`/api/cards/${customerId}`)
    const cards = await response.json()
    return cards as Stripe.Card[]
  }
)

export const removeCard = createAsyncThunk(
  "api/cards/remove",
  async ({ customerId, sourceId }: { customerId: string; sourceId: string }) => {
    const response = await fetch(`/api/cards/${customerId}`, {
      method: "DELETE",
      body: JSON.stringify({
        sourceId,
      }),
    })
    const card = await response.json()
    return card as Stripe.Card
  }
)

export const attachCard = createAsyncThunk(
  "api/cards/add",
  async ({ cardToken }: { cardToken: string }, thunkApi) => {
    const {
      customer: { id },
    } = thunkApi.getState() as RootState

    const response = await fetch(`/api/cards/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        cardToken,
      }),
    })
    const card = await response.json()
    return card
  }
)

type cardsState = {
  cardsList: Stripe.Card[]
  hasCard: boolean
  loading: Record<string, boolean>
}

export const cards = createSlice({
  name: "cards",
  initialState: {
    cardsList: [],
    hasCard: false,
    loading: {
      addingCard: false,
      removingCard: false,
      changingDefaultCard: false,
    },
  } as cardsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.cardsList = action.payload
      state.hasCard = state.cardsList.length > 0
    })
    builder.addCase(removeCard.fulfilled, (state, action) => {
      state.cardsList = state.cardsList.filter((card) => action.payload.id !== card.id)
      state.hasCard = state.cardsList.length > 0
    })
    builder.addCase(attachCard.fulfilled, (state, action) => {
      state.cardsList = [...state.cardsList, action.payload]

      state.hasCard = state.cardsList.length > 0
    })
  },
})

// export const { } = cards.actions

export default cards.reducer
