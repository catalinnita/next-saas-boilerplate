import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Box, Button, Flex, Heading, Text } from "rebass"
import { showPopup } from "../state/slices/popups"
import { activateSubscription, cancelSubscription, getSubscription } from "../state/slices/subscription"
import { useStateSelector } from "../utils/useStateSelector"
import { Block } from "./block"

export const dataTestIds = {
  cancelButton: "subscription-cancel-button",
  activateButton: "subscription-activate-button"
}

export type Props = {
  customerId: string,
}

export const BlockSubscription: React.FC<Props> = ({ customerId }) => {
  const dispatch = useDispatch()
  const subscription = useStateSelector("subscription")
  const { hasCard } = useStateSelector("cards")

  useEffect(() => {
    customerId && dispatch(getSubscription(customerId))
  }, [customerId])

  return (
    <Block
      gridTemplateColumns={[35, 15, 25, 10, 15]}
      headerLeft={<Heading as="h3">Membership</Heading>}
    >

      <Box variant="rowStyle">
        <Text as="span" fontWeight={500}>
        {!subscription.status ?
          `ScrambledData Free` :
          `ScrambledData Premium - ${subscription.currencySymbol}${subscription.price} / ${subscription.period}`
        }
        </Text>
      </Box>

      <Box variant="rowStyle">{subscription.createdDate}</Box>
      <Box variant="rowStyle">
        {subscription.status === "active"
          && <Box>Next invoice date: {subscription.invoiceDate}</Box>}
        {subscription.status === "trialing"
          && <Box>Trial ends at: {subscription.trialEnd}</Box>}
      </Box>
      <Box variant="rowStyle"><Text variant={subscription.status}>{subscription.status}</Text></Box>

      <Box variant="rowStyle">
        <Flex justifyContent="flex-end">
          {subscription.status && subscription.status !== "canceled"
            && <Box><Button variant="primaryGhostSmall" data-testid={dataTestIds.cancelButton} onClick={() => { dispatch(cancelSubscription(subscription.id)) }}>Cancel</Button></Box>}

          {!subscription.status
            && <Box><Button variant="secondarySmall" data-testid={dataTestIds.activateButton} onClick={() => { dispatch(showPopup({ "popup": "setup" })) }}>Upgrade</Button></Box>}

          {subscription.status === "canceled" && hasCard
            && <Box><Button variant="primarySmall" data-testid={dataTestIds.activateButton} onClick={() => { dispatch(activateSubscription()) }}>Activate</Button></Box>}

          {subscription.status === "canceled" && !hasCard
            && <Box><Button variant="primarySmall" data-testid={dataTestIds.activateButton} onClick={() => { dispatch(showPopup({popup: "upgrade"})) }}>Activate</Button></Box>}
        </Flex>
      </Box>

    </Block>
  )
}
