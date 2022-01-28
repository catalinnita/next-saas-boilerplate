import Stripe from "stripe"
import React from "react"
import { Box, Button, Text } from "rebass"
import { Label, Radio } from "@rebass/forms"
import { useDispatch } from "react-redux"
import { CardIcon } from "./cardIcon"
import { useStateSelector } from "../utils/useStateSelector"
import { updateDefaultCard } from "../state/slices/customer"
import { removeCard } from "../state/slices/cards"

export const dataTestIds = {
  cardRow: "card-row",
  defaultCardRadio: "card-radio",
  removeCardButton: "card-remocec",
}

export type Props = {
  card: Stripe.Card
}

export const RowCard: React.FC<Props> = ({ card }) => {
  const dispatch = useDispatch()
  const { id, defaultCardId } = useStateSelector("customer")
  return (
    <>
      <Box data-testid={dataTestIds.cardRow} variant="rowStyle">
        <Label>
          <Radio
            data-testid={dataTestIds.defaultCardRadio}
            title="Set as default"
            variant="defaultCardRadio"
            size={18}
            name="defaultCard"
            value={card.id}
            checked={defaultCardId === card.id}
            onChange={(): void => {
              dispatch(
                updateDefaultCard({
                  customerId: id,
                  sourceId: card.id,
                })
              )
            }}
          />
        </Label>
      </Box>

      <Box variant="rowStyle">
        <CardIcon name={card.brand} />
      </Box>

      <Box variant="rowStyle">
        <Text as="span" variant="cardNumber">
          **** **** **** {card.last4}
        </Text>
      </Box>

      <Box variant="rowStyle">{`${card.exp_month}/${card.exp_year}`}</Box>

      <Box variant="rowStyle" sx={{ justifySelf: "end" }}>
        <Button
          data-testid={dataTestIds.removeCardButton}
          variant="greyGhostSmall"
          onClick={(): void => {
            dispatch(
              removeCard({
                customerId: id,
                sourceId: card.id,
              })
            )
          }}
        >
          remove
        </Button>
      </Box>
    </>
  )
}
