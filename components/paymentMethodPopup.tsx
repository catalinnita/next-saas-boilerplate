import React from "react"
import { Heading, Text } from "rebass"
import { FormCreditCard } from "./formCreditCard"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from '@stripe/react-stripe-js';
import { Popup } from "./popup"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export type Props = {
  dataTestid?: string
}

export const PaymentMethodPopup: React.FC<Props> = ({ dataTestid }) => {
  const fonts = [{ cssSrc: "https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400" }]

  return (
    <Popup title="Add payment method">
        <Heading pb="8px">Add payment method</Heading>
        <Text fontSize="14px">You must add at least a payment method in order to start your trial. You won't be charged until the trial ends in [x] days from now.</Text>
        <Elements options={{ fonts }} stripe={stripePromise}>
          <FormCreditCard
            buttonText="Add card"
          />
        </Elements>
      </Popup>

  )
}
