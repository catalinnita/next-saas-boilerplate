import React, { useContext } from "react"
import { Box, Button } from "rebass"
import { UserContext } from "../context/userContext"

export const dataTestIds = {
  container: "upgrade-banner-container",
  button: "upgrade-button"
}

export type Props = {
  openPopup?: (popup: string) => void
}

export const UpgradeBanner: React.FC<Props> = ({ openPopup }) => {
  const { hadTrial } = useContext(UserContext)
  const upgradeText = hadTrial ? "Upgrade to premium" : "Start premium trial"
  return (
    <Box data-testid={dataTestIds.container} variant="infoBanner">You are missing very usefull features ... <Button data-testid={dataTestIds.button} variant="secondary" onClick={():void => openPopup("paymentMethod")}>{upgradeText}</Button></Box>
  )
}
