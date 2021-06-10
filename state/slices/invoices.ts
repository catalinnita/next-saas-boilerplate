import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getInvoices = createAsyncThunk(
  'api/invoices/',
  async (customerId: string) => {
    const response = await fetch(`/api/invoices/${customerId}`)
    const invoices = response.json()
    return invoices
  }
)

export const loadMoreInvoices = createAsyncThunk(
  'api/loadMoreInvoices/',
  async({ customerId, lastObject }: { customerId: string, lastObject: string }) => {
    const response = await fetch(`/api/invoices/${customerId}?lastObject=${lastObject}`)
    const invoices = response.json()
    return invoices
  }
)

export const invoices = createSlice({
  name: 'cards',
  initialState: {
    invoicesList: [],
    hasMore: false,
  },
  reducers: {
  },
  extraReducers: (builder) =>  {
    builder.addCase(getInvoices.fulfilled, (state, action) => {
      console.log(action.payload)
      state.invoicesList = action.payload.data
      state.hasMore = action.payload.has_more
    })
    builder.addCase(loadMoreInvoices.fulfilled, (state, action) => {
      console.log(action.payload)
      state.invoicesList = [
        ...state.invoicesList,
        ...action.payload.data
      ]
      state.hasMore = action.payload.has_more
    })
  }
})

export const { } = invoices.actions

export default invoices.reducer
