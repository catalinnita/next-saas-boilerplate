import React, { useEffect } from "react"
import { Button, Heading } from "rebass"
import { showPopup } from '../state/slices/popups'
import { useDispatch } from "react-redux"
import { RowCard } from "./rowCard"
import { getCards } from "../state/slices/cards"
import { useStateSelector } from "../utils/useStateSelector"
import { Block } from "./block"
import { Stripe } from "stripe"

export const dataTestIds = {
  container: "payment-methods-container",
  card: "payment-methods-card"
}

export type Props = {
  customerId: string,
}

export const BlockCards: React.FC<Props> = ({ customerId }) => {
  const dispatch = useDispatch()
  const { cardsList } = useStateSelector("cards")

  const canAddMoreCards = cardsList.length < 5
  const orderedCards = Object.values(cardsList).sort((a: Stripe.Card, b: Stripe.Card) => {
    return a.id < b.id ? -1 : 1;
  }) as Stripe.Card[]

  useEffect(() => {
    dispatch(getCards({ customerId }))
  }, [customerId])

  if (!cardsList.length) {
    return null
  }

  return (
    <Block
      gridTemplateColumns={[5, 5, 25, 55, 10]}
      headerLeft={
        <Heading as="h3" fontSize="18px">Payment methods</Heading>
      }
      headerRight={
        canAddMoreCards &&
        <Button
          variant="small"
          onClick={() => {
            dispatch(showPopup({
              popup: "paymentMethod"
            }))
          }}>
          Add card
        </Button>
      }
      >
        {orderedCards.map(card => (
          <RowCard
            key={card.id}
            card={card}
          />
        ))}
    </Block>
  )
}
