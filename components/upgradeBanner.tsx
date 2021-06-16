import React from "react"
import { useDispatch } from "react-redux"
import { Flex, Button, Text, Box } from "rebass"
import { showPopup } from "../state/slices/popups"
import { activateSubscription } from "../state/slices/subscription"
import { useStateSelector } from "../utils/useStateSelector"


export const dataTestIds = {
  container: "upgrade-banner-container",
  button: "upgrade-button"
}

export type Props = {
  openPopup?: (popup: string) => void
}

export const UpgradeBanner: React.FC<Props> = ({ openPopup }) => {
  const dispatch = useDispatch()
  const { hasCard } = useStateSelector("cards")
  const subscription = useStateSelector("subscription") // ?
  const { popupToShow } = useStateSelector("popups")

  const upgradeAction = () => {
    if (!subscription.status) {
      dispatch(showPopup({ popup: "setup" }))
    } else if (!hasCard) {
      dispatch(showPopup({ popup: "upgrade" }))
    } else {
      dispatch(activateSubscription())
    }
  }

  // add it to state
  const hadTrial = false
  const upgradeText = hadTrial ? "Upgrade to premium" : "Start premium trial"

  if (
    popupToShow ||
    ['canceled', null].indexOf(subscription.status) !== -1
   ) {
    return null
  }

  return (
    <Box width="100%" maxWidth="1080px" pt="32px" mx="auto">
      <Flex data-testid={dataTestIds.container} variant="infoBanner" justifyContent="center" alignItems="center">
        <Text fontSize="13px" fontWeight={400} mr="8px">FREE version is nice, but you are missing very important features ...</Text>
        <Button data-testid={dataTestIds.button} variant="smallGhostGreen" onClick={(): void => { upgradeAction() }}>{upgradeText}</Button>
      </Flex>
    </Box>
  )
}
