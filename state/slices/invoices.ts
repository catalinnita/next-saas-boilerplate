import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const getInvoices = createAsyncThunk(
  'api/invoices/',
  async ({ customerId }: { customerId: string }, thunkApi) => {
    const response = await fetch(`/api/invoices/${customerId}`)
    const remoteInvoices = response.json()
    return remoteInvoices
  }
)

export const loadMoreInvoices = createAsyncThunk(
  'api/loadMoreInvoices/',
  async ({ customerId, lastObject }: { customerId: string, lastObject: string }, thunkApi) => {
    const response = await fetch(`/api/invoices/${customerId}?lastObject=${lastObject}`)
    const remoteInvoices = await response.json()
    return remoteInvoices
  }
)

export const invoices = createSlice({
  name: 'cards',
  initialState: {
    invoicesList: [],
    hasMore: false,
    lastObject: ""
  },
  reducers: {
  },
  extraReducers: (builder) =>  {

    builder.addCase(getInvoices.fulfilled, (state, action) => {
      state.invoicesList = action.payload.data
      state.hasMore = action.payload.has_more
      state.lastObject = action.payload.data?.slice(-1)[0].id
    })

    builder.addCase(loadMoreInvoices.fulfilled, (state, action) => {
      state.invoicesList = [
        ...state.invoicesList,
        ...action.payload.data
      ]
      state.hasMore = action.payload.has_more
      state.lastObject = action.payload.data?.slice(-1)[0].id
    })

  }
})

export const { } = invoices.actions

export default invoices.reducer
