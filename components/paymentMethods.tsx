import React from "react"
import { Box, Button, Flex, Heading } from "rebass"
import Stripe from "stripe"

export const dataTestIds = {
  container: "payment-methods-container",
  card: "payment-methods-card"
}

export type Props = {
  cards: Stripe.Card[]
}

export const PaymentMethods: React.FC<Props> = ({ cards }) => {
  const isExpired = (card: Stripe.Card): boolean => {
    const cardDate = new Date(`${card.exp_year}-${card.exp_month}`).toISOString();
    const now = new Date().toISOString()
    return Date.parse(cardDate) - Date.parse(now) < 0
  }
  return (
    <Box data-testid={dataTestIds.container}>
      <Heading as="h2">Payment methods</Heading>
      {cards.map(card => (
        <Flex data-testid={dataTestIds.card} disabled={isExpired(card)} key={card.id} alignItems="center" justifyContent="space-between">
          <Box>{card.brand}</Box>
          <Box>**** **** **** {card.last4}</Box>
          <Box>`${card.exp_month}/${card.exp_year}`</Box>
          <Box><Button variant="secondary">remove</Button></Box>
        </Flex>
      ))}
    </Box>
  )
}
