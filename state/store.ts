import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/user"
import subscriptionReducer from "./slices/subscription"
import customerReducer from "./slices/customer"
import cardsReducer from "./slices/cards"
import invoicesReducer from "./slices/invoices"
import popupsReducer from "./slices/popups"
import projectsReducer from "./slices/projects"

const reducer = {
  subscription: subscriptionReducer,
  user: userReducer,
  customer: customerReducer,
  cards: cardsReducer,
  invoices: invoicesReducer,
  popups: popupsReducer,
  projects: projectsReducer,
}

const store = configureStore({
  reducer
})

export type RootState = ReturnType<typeof store.getState>

export default store
