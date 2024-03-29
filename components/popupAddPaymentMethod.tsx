import React from "react"
import { Box, Heading, Text } from "rebass"
import { useDispatch } from "react-redux"
import { Popup } from "./popup"
import AppConfig from "../config/appConfig"
import { StripeElementsProvider } from "./stripeElementsProvider"
import { FormCreditCard } from "./formCreditCard"
import { attachCard } from "../state/slices/cards"
import { closeAllPopups } from "../state/slices/popups"

export const dataTestIds = {
  container: "popup-payment-method-container",
}

export type Props = {
  dataTestid?: string
}

export const PopupAddPaymentMethod: React.FC<Props> = () => {
  const dispatch = useDispatch()

  const onSubmitCallback = ({ cardToken }: Record<string, any>): void => {
    dispatch(attachCard({ cardToken }))
    dispatch(closeAllPopups())
  }

  return (
    <Popup>
      <Box data-testid={dataTestIds.container}>
        <Heading pb="8px">Add a new payment method</Heading>
        <Text fontSize="14px">{`You must add at least a payment method in order to start your trial. You won't be charged until the trial ends in ${AppConfig.trialPeriod} days from now.`}</Text>
        <StripeElementsProvider>
          <FormCreditCard
            buttonText="Add Card"
            onSubmitCallback={(args): void => {
              onSubmitCallback(args)
            }}
          />
        </StripeElementsProvider>
      </Box>
    </Popup>
  )
}
