import React, { useContext } from "react"
import { Flex, Button, Text } from "rebass"
import { UserContext } from "../context/userContext"
import { useStripe } from "../utils/useStripe"

export const dataTestIds = {
  container: "upgrade-banner-container",
  button: "upgrade-button"
}

export type Props = {
  openPopup?: (popup: string) => void
}

export const UpgradeBanner: React.FC<Props> = ({ openPopup }) => {
  const { user, hadTrial } = useContext(UserContext)
  const upgradeText = hadTrial ? "Upgrade to premium" : "Start premium trial"
  const { customer, subscription } = useStripe(user)

  return (
    <Flex data-testid={dataTestIds.container} variant="infoBanner" justifyContent="center" alignItems="center">
      <Text fontSize="13px" fontWeight={400} mr="8px">FREE version is nice, but you are missing very important features ...</Text>
      <Button data-testid={dataTestIds.button} variant="smallGhostGreen" onClick={(): void => openPopup("paymentMethod")}>{upgradeText}</Button>
    </Flex>
  )
}
