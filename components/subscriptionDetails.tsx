import React from "react"
import { Box, Button, Flex, Heading, Text } from "rebass"
import { subscriptionState } from "../state/slices/subscription/state"

export const dataTestIds = {
  container: "subscription-methods-container",
  cancelButton: "subscription-cancel-button",
  activateButton: "subscription-activate-button"
}

export type Props = {
  subscription: subscriptionState,
  cancelSubscriptionCallback: () => void
  activateSubscriptionCallback: () => void
}

export const SubscriptionDetails: React.FC<Props> = ({ subscription, cancelSubscriptionCallback, activateSubscriptionCallback }) => {
  return (
      <>
      <Box
        data-testid={dataTestIds.container}
        variant="tableStyle"
        sx={{
          gridTemplateColumns: "35% 15% 25% 10% 15%",
        }}
      >
        <Flex justifyContent="space-between" alignItems="center"
          backgroundColor="white"
          p="12px 16px"
          sx={{
            gridColumnStart: 1,
            gridColumnEnd: 6
          }}>
          <Heading as="h3" fontSize="18px">Membership</Heading>
        </Flex>
        <Box variant="rowStyle"><Text as="span" fontWeight={500}>ScrambledData Premium - {`${subscription.currencySymbol}${subscription.price} / ${subscription.period}`}</Text></Box>
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
            {subscription.status !== "canceled"
              && <Box><Button variant="smallghost" data-testid={dataTestIds.cancelButton} onClick={() => { cancelSubscriptionCallback() }}>Cancel</Button></Box>}
            {subscription.status === "canceled"
                && <Box><Button variant="small" data-testid={dataTestIds.activateButton} onClick={() => { activateSubscriptionCallback() }}>Activate</Button></Box>}
          </Flex>
        </Box>

      </Box>

      {/* <Flex data-testid={dataTestIds.container}>

      <Box width={1 / 3} textAlign="center">
        <Text variant="subscriptionTitle">ScrambledData Premium</Text>
        <Text as="span">{ subscription.currencySymbol }</Text>
        <Text as="span" fontSize="32px" fontWeight={700} sx={{ letterSpacing: "-0.05rem" }}>{subscription.price}</Text>
        <Text as="span"> / {subscription.period}</Text>
        <Text variant={subscription.status}>{subscription.status}</Text>
      </Box>

      <Box width={2/3} textAlign="right">
        <Box>Created at: {subscription.createdDate}</Box>
        {subscription.status === "active"
          && <Box>Next invoice date: {subscription.invoiceDate}</Box>}
        {subscription.status === "trialing"
          && <Box>Trial ends at: {subscription.trialEnd}</Box>}
        {subscription.status !== "canceled"
          && <Box><Button mt="16px" variant="smallghost" data-testid={dataTestIds.cancelButton} onClick={() => { cancelSubscriptionCallback() }}>Cancel subscription</Button></Box>}
        {subscription.status === "canceled"
          && <Box><Button mt="16px" variant="small" data-testid={dataTestIds.activateButton} onClick={() => { activateSubscriptionCallback() } }>Activate subscription</Button></Box>}
      </Box>

      </Flex> */}
      </>
  )
}
