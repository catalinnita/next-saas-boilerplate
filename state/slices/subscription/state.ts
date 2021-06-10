export interface subscriptionState {
  id: string
  name: string
  price: string
  currencySymbol: string
  period: 'day' | 'month' | 'week' | 'year'
  createdDate: string
  trialEnd: string
  invoiceDate: string
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid'
  loading: {
    creating: boolean
    cancelling: boolean
    activating: boolean
  }
}

export const initialState = {
  id: null,
  name: "SCRAMBLED DATA PREMIUM",
  price: "",
  currencySymbol: null,
  period: null,
  createdDate: null,
  trialEnd: null,
  invoiceDate: null,
  status: null,
  loading: {
    creating: false,
    cancelling: false,
    activating: false,
  }
} as subscriptionState
