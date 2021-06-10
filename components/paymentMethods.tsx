import React from "react"
import { Box, Button, Flex, Heading, Text } from "rebass"
import Stripe from "stripe"
import { CardIcon } from "./cardIcon"
import { Radio } from '@rebass/forms'
import { Label } from "@theme-ui/components"
import { showPopup } from '../state/slices/popups'
import { RootState } from "../state/store"
import { useDispatch, useSelector } from "react-redux"


export const dataTestIds = {
  container: "payment-methods-container",
  card: "payment-methods-card"
}

export type Props = {
  cards: Stripe.Card[]
  defaultCard?: string
  updateDefaultCard: (cardId: string) => void
  removeCard: (cardId: string) => void
  setDefaultPopup: (popup: string) => void
}

export const PaymentMethods: React.FC<Props> = ({ cards, defaultCard, updateDefaultCard, removeCard}) => {
  const dispatch = useDispatch()
  const canAddMoreCards = cards.length < 5
  const orderedCards = Object.values(cards).sort((a, b) => {
    return a.id < b.id ? -1 : 1;
  })

  // const isExpired = (card: Stripe.Card): boolean => {
  //   const cardDate = new Date(`${card.exp_year}-${card.exp_month}`).toISOString();
  //   const now = new Date().toISOString()
  //   return Date.parse(cardDate) - Date.parse(now) < 0
  // }

  return (
    <Box data-testid={dataTestIds.container}>

      <Box
        data-testid={dataTestIds.card}
        variant="tableStyle"
        sx={{
          gridTemplateColumns: "5% 5% 25% 55% 10%"
        }}
      >
        <Flex justifyContent="space-between" alignItems="center"
          backgroundColor="white"
          p="12px 16px"
          sx={{
            gridColumnStart: 1,
            gridColumnEnd: 6
          }}>
          <Heading as="h3" fontSize="18px">Payment methods</Heading>
          {canAddMoreCards && <Button variant="small" onClick={() => { dispatch(showPopup({ popup: "paymentMethod" })) }}>Add card</Button>}
        </Flex>

        {orderedCards.map(card => (
          <>
            <Box key={`${card.id}-default`} variant="rowStyle">
              <Label>
                <Radio
                  title="Set as default"
                  variant="defaultCardRadio"
                  size={18}
                  name="defaultCard"
                  value={card.id}
                  checked={defaultCard === card.id ? "checked" : ""}
                  onChange={() => {
                    updateDefaultCard(card.id)
                  }}
                  />
              </Label>
            </Box>
            <Box variant="rowStyle"><CardIcon name={card.brand} /></Box>
            <Box variant="rowStyle"><Text as="span" variant="cardNumber">**** **** **** {card.last4}</Text></Box>
            <Box variant="rowStyle">{`${card.exp_month}/${card.exp_year}`}</Box>
            <Box variant="rowStyle" sx={{ justifySelf: "end" }}><Button variant="smallGhostGrey" onClick={() => { removeCard(card.id) }}>remove</Button></Box>
          </>

        ))}
      </Box>

    </Box>
  )
}
