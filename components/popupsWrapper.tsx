import React, { useEffect } from "react"
import { parseCookies } from 'nookies'
import { PopupAddPaymentMethod } from "./popupAddPaymentMethod"
import { PopupUpgrade } from "./popupUpgrade"
import { PopupSetup } from "./popupSetup"
import { useStateSelector } from "../utils/useStateSelector"
import appConfig from "../config/appConfig"
import { useDispatch } from "react-redux"
import { showPopup } from "../state/slices/popups"

export const dataTestIds = {
  container: "popupsWrapper-container",
  freePremiumPopup: "popupsWrapper-freePremium",
  paymentMethodPopup: "popupsWrapper-paymentMethod"
}

export type Props = {
  defaultPopup?: string
}

export const PopupsWrapper: React.FC<Props> = ({ children, defaultPopup }) => {
  const dispatch = useDispatch()

  const { popupToShow } = useStateSelector("popups")
  const { hasCard } = useStateSelector("cards")
  const { setupPopupDisplayed } = parseCookies()

  useEffect(() => {
    // if (hasCard) return
    console.log({setupPopupDisplayed})
    if (setupPopupDisplayed) return
    dispatch(showPopup("afterRegister"))
  }, [hasCard, setupPopupDisplayed])

  return (
    <div data-testid={dataTestIds.container}>
      { popupToShow === "afterRegister" &&
        <PopupSetup
        showCloseButton={false}
        showSkipLink={appConfig.noCreditCardTrial}
        />}

      { popupToShow === "setup" &&
        <PopupSetup />}

      { popupToShow === "paymentMethod" &&
        <PopupAddPaymentMethod
        dataTestid={dataTestIds.paymentMethodPopup}
        />}

      { popupToShow === "upgrade" &&
        <PopupUpgrade
        dataTestid={dataTestIds.paymentMethodPopup}
        />}

      { !popupToShow && children }
    </div>
  )
}
