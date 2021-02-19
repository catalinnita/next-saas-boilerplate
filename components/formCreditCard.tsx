import React, { useState } from "react"
import { Box } from "rebass"
import { Input, Label } from "theme-ui"

export type Props = {
}

export const dataTestIds = {
  container: "creditcard-container",
  nameOnCard: "name-on-card-input",
  cardNumber: "card-number-input",
  expiryDate: "card-expiry-date-input",
  cvc: "card-cvc-input",
}

export type CardInfo = {
  nameOnCard: string,
  cardNumber: string,
  expiryDate: string,
  cvc: string,
}

export const FormCreditCard: React.FC<Props> = () => {
  const [cardInfo, setCardInfo] = useState({} as CardInfo);

  return (
    <Box data-testid={dataTestIds.container} as="form">
      <Label>Name of card</Label>
      <Input
        data-testid={dataTestIds.nameOnCard}
        value={cardInfo.nameOnCard}
        placeholder="John D"
        onChange={(e): void => {
          setCardInfo({
            ...cardInfo,
            nameOnCard: e.target.value
          })
        }}
      />

      <Label>Card Number</Label>
      <Input
        data-testid={dataTestIds.cardNumber}
        value={cardInfo.cardNumber}
        placeholder="xxxx-xxxx-xxxx-xxxx"
        onChange={(e): void => {
          setCardInfo({
            ...cardInfo,
            cardNumber: e.target.value
          })
        }}/>

      <Label>Expiry Date</Label>
      <Input
        data-testid={dataTestIds.expiryDate}
        value={cardInfo.expiryDate}
        placeholder="08/22"
        maxLength={5}
        onChange={(e): void => {
          setCardInfo({
            ...cardInfo,
            expiryDate: e.target.value
          })
        }}
      />

      <Label>CVC</Label>
      <Input
        data-testid={dataTestIds.cvc}
        value={cardInfo.cvc}
        placeholder="123"
        maxLength={3}
        onChange={(e): void => {
          setCardInfo({
            ...cardInfo,
            cvc: e.target.value
          })
        }}
      />

    </Box>
  )
}
