import React, { useState } from "react"
import { Box, Button, Flex } from "rebass"
import { Input, Label } from "theme-ui"

export type Props = {
  buttonText?: string
}

export const dataTestIds = {
  container: "creditcard-container",
  nameOnCard: "name-on-card-input",
  cardNumber: "card-number-input",
  expiryDate: "card-expiry-date-input",
  cvc: "card-cvc-input",
  submitButton: "payment-method-submit"
}

export type CardInfo = {
  nameOnCard: string,
  cardNumber: string,
  expiryDate: string,
  cvc: string,
}

export const FormCreditCard: React.FC<Props> = ({
  buttonText = "Add payment method"
}) => {
  const [cardInfo, setCardInfo] = useState({} as CardInfo);
  const submitPaymentMethod = (): void => {
    console.log(cardInfo)
    // ---
  }

  return (
    <Box data-testid={dataTestIds.container} as="form" width="100%" onSubmit={(e): void => { e.preventDefault() }}>

      <Label>Name of card</Label>
      <Input
        data-testid={dataTestIds.nameOnCard}
        mb={2}
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
        mb={2}
        value={cardInfo.cardNumber}
        placeholder="xxxx-xxxx-xxxx-xxxx"
        onChange={(e): void => {
          setCardInfo({
            ...cardInfo,
            cardNumber: e.target.value
          })
        }}/>

      <Flex justifyContent="space-between" mb={2}>
        <Box width={1/2}>
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
        </Box>
        <Box width={1/2}>
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
      </Flex>

      <Button data-testid={dataTestIds.submitButton} variant="secondary" onClick={(): void => { submitPaymentMethod()}}>{ buttonText }</Button>
    </Box>
  )
}
