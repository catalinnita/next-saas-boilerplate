import React, { useEffect } from "react"
import { Button, Heading } from "rebass"
import { showPopup } from '../state/slices/popups'
import { useDispatch } from "react-redux"
import { RowCard } from "./rowCard"
import { getCards } from "../state/slices/cards"
import { useStateSelector } from "../utils/useStateSelector"
import { Block } from "./block"
import { orderObjectById } from "../utils/orderObjectById"

export const dataTestIds = {
  card: "payment-methods-card",
  addCardButton: "add-card-button",
  cardRow: "card-row"
}

export type Props = {
  customerId: string,
}

export const BlockCards: React.FC<Props> = ({ customerId }) => {
  const dispatch = useDispatch()
  const { cardsList } = useStateSelector("cards")

  const canAddMoreCards = cardsList.length < 5
  const orderedCards = orderObjectById(cardsList)

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
        <Heading as="h3">Payment methods</Heading>
      }
      headerRight={
        canAddMoreCards &&
        <Button
          data-testid={dataTestIds.addCardButton}
          variant="primarySmall"
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
