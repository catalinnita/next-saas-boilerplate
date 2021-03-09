import React from "react"
import { Box, Heading, Text, Flex, Button } from "rebass"

export type Props = {
  freeClickCallback: () => void,
  premiumClickCallback: () => void,
  dataTestid?: string,
}

export const dataTestIds = {
  freeButton: "freeButton",
  premiumButton: "premiumButton",
}

export const FreePremiumPopup: React.FC<Props> = ({
  freeClickCallback,
  premiumClickCallback,
  dataTestid,
}) => {
  return (
    <Flex data-testid={dataTestid} justifyContent="center" alignItems="center" height="100vh">
      <Box width="100%" maxWidth="400px">
        <Heading pb={1}>Choose the red pill or the blue pill</Heading>
        <Text pb={2}>Red pill will send you back to the FREE version of the service. Blue pill will free you up and will show you the premium version for [x] days.</Text>
        <Flex justifyContent="space-between">
          <Button data-testid={dataTestIds.freeButton} variant="secondary" onClick={(): void => { freeClickCallback() }}>Back to free</Button>
          <Button data-testid={dataTestIds.premiumButton} variant="secondary" onClick={(): void => { premiumClickCallback() }}>Go with premium</Button>
        </Flex>
      </Box>
    </Flex>
  )
}
