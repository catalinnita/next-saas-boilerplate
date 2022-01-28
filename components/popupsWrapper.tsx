import React, { useEffect } from "react"
import { parseCookies } from "nookies"
import { useDispatch } from "react-redux"
import { PopupAddPaymentMethod } from "./popupAddPaymentMethod"
import { PopupUpgrade } from "./popupUpgrade"
import { PopupSetup } from "./popupSetup"
import { useStateSelector } from "../utils/useStateSelector"
import appConfig from "../config/appConfig"
import { showPopup } from "../state/slices/popups"

export const dataTestIds = {
  container: "popupsWrapper-container",
  freePremiumPopup: "popupsWrapper-freePremium",
  paymentMethodPopup: "popupsWrapper-paymentMethod",
}

export type Props = {
  defaultPopup?: string
}

export const PopupsWrapper: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch()

  const { popupToShow } = useStateSelector("popups")
  const { hasCard } = useStateSelector("cards")
  const { setupPopupDisplayed } = parseCookies()

  useEffect(() => {
    if (setupPopupDisplayed) return
    dispatch(showPopup({ popup: "afterRegister" }))
  }, [hasCard, setupPopupDisplayed, dispatch])

  return (
    <div data-testid={dataTestIds.container}>
      {popupToShow === "afterRegister" && (
        <PopupSetup showCloseButton={false} showSkipLink={appConfig.noCreditCardTrial} />
      )}
      {popupToShow === "setup" && <PopupSetup />}
      {popupToShow === "paymentMethod" && <PopupAddPaymentMethod />}
      {popupToShow === "upgrade" && <PopupUpgrade />}
      {!popupToShow && children}
    </div>
  )
}
