import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export const StripeElementsProvider: React.FC = ({children}) => {
  const fonts = [{ cssSrc: "https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400" }]

  return (
    <Elements options={{ fonts }} stripe={stripePromise}>
      {children}
    </Elements>
  )
}
