import React from "react"
import { Box, Heading, Text } from "rebass"
import { Popup } from "./popup"
import { StripeElementsProvider } from "./stripeElementsProvider"
import { useDispatch } from "react-redux"
import { attachCard } from "../state/slices/cards"
import { closeAllPopups } from "../state/slices/popups"
import { FormCreditCard } from "./formCreditCard"
import { activateSubscription } from "../state/slices/subscription"

export const dataTestIds = {
  container: "popup-upgrade-container"
}

export type Props = {
  dataTestid?: string
}

export const PopupUpgrade: React.FC<Props> = ({ dataTestid }) => {
  const dispatch = useDispatch()

  const onSubmitCallback = ({ cardToken }: Record<string, any>) => {
    Promise.all([
      dispatch(attachCard({ cardToken })),
      dispatch(activateSubscription())
    ]).then(values => {
      dispatch(closeAllPopups())
    })
  }
  return (
    <Popup>
      <Box data-testid={dataTestIds.container}>
        <Heading pb="8px">Unlock all juicy features</Heading>
        <Text fontSize="14px">{`You must add at least a payment method in order to upgrade. You will be changed £10/month.`}</Text>
        <StripeElementsProvider>
          <FormCreditCard
            buttonText="Add card and upgrade"
            onSubmitCallback={(args) => { onSubmitCallback(args) }}
          />
        </StripeElementsProvider>
      </Box>
    </Popup>
  )
}
