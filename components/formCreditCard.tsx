import React from "react"
import { Box, Button, Flex } from "rebass"
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement, Elements } from '@stripe/react-stripe-js'


export type Props = {
  buttonText?: string
  onSubmitCallback?: (args: Record<string, any>) => void
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
  buttonText = "Submit",
  onSubmitCallback
}) => {

  const inputStyle = {
    base: {
      fontFamily: '"Roboto Mono", Courier',
      fontSize: '13px',
      color: '#000',
      lineHeight: '28px',
      width: '100%',
      padding: '8px 16px'
    }
  }

  const stripe = useStripe()
  const elements = useElements()

  const submitPaymentMethod = async (): void => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    const {error, token} = await stripe.createToken(cardElement);

    if (error) {
      console.error(error)
    } else {
      onSubmitCallback({cardToken: token.id})
    }
  }


  return (
    <Box data-testid={dataTestIds.container} as="form" width="100%" onSubmit={(e): void => { e.preventDefault() }}>

      <Flex py="16px">
        <Box variant="cardInput" width={3 / 5} mr="16px">
          <CardNumberElement className="ccField" options={{ style: inputStyle }}
          />
        </Box>
        <Box variant="cardInput" width={1 / 5}>
          <CardExpiryElement className="expirationField" options={{ style: inputStyle }} />
        </Box>
        <Box variant="cardInput" width={1 / 5}>
          <CardCvcElement className="ccvField" options={{ style: inputStyle }} />
        </Box>
      </Flex>

      <Button data-testid={dataTestIds.submitButton} variant="primary" onClick={(): void => { submitPaymentMethod() }}>{buttonText}</Button>

    </Box>
  )
}
