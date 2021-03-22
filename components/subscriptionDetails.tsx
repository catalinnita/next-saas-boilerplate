import React from "react"
import { Box, Button, Heading } from "rebass"
import Stripe from "stripe"
import getSymbolFromCurrency from "currency-symbol-map"
import { getDate } from "../utils/getDate"

export const dataTestIds = {
  container: "subscription-methods-container",
  cancelButton: "subscription-cancel-button",
  activateButton: "subscription-activate-button"
}

export type Props = {
  subscription: Stripe.Subscription
}

export const SubscriptionDetails: React.FC<Props> = ({ subscription }) => {
  const subscriptionPrice = `${getSymbolFromCurrency(subscription.items.data[0].price.currency)}${subscription.items.data[0].price.unit_amount / 100} / ${subscription.items.data[0].price.recurring.interval}`
  return (
    <Box data-testid={dataTestIds.container}>
      <Heading as="h2">Subscription details</Heading>
      <Box>Created at: {getDate(subscription.created)}</Box>
      <Box>{subscriptionPrice}</Box>
      <Box>Status: {subscription.status}</Box>
      {subscription.status === "active"
        && <Box>Next invoice date: {getDate(subscription.current_period_end)}</Box>}

      {subscription.status === "trialing"
        && <Box>Trial ends at: {getDate(subscription.trial_end)}</Box>}

      {subscription.status !== "canceled"
        && <Box><Button data-testid={dataTestIds.cancelButton}>Cancel subscription</Button></Box>}

      {subscription.status === "canceled"
        && <Box><Button data-testid={dataTestIds.activateButton}>Activate subscription</Button></Box>}
    </Box>
  )
}
