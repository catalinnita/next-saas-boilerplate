import React from "react"
import { Box, Heading, Text, Flex} from "rebass"
import { FormCreditCard } from "./formCreditCard"

export type Props = {
  dataTestid?: string
}

export const PaymentMethodPopup: React.FC<Props> = ({ dataTestid }) => {

  return (
    <Flex data-testid={dataTestid} justifyContent="center" alignItems="center" height="100vh">
      <Box width="100%" maxWidth="400px">
        <Heading pb={1}>Add payment method</Heading>
        <Text pb={2}>You must add at least a payment method in order to start your trial. You won't be charged until the trial ends in [x] days from now.</Text>
        <FormCreditCard
          buttonText="Start trial"
        />
      </Box>
    </Flex>
  )
}
