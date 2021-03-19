import React, { useState, useEffect, useContext } from "react"
import appConfig from "../config/appConfig"
import { FreePremiumPopup } from "./freePremiumPopup"
import { PaymentMethodPopup } from "./paymentMethodPopup"
import { UserContext } from "../context/userContext"
import { UpgradeBanner } from "./upgradeBanner"


export const dataTestIds = {
  container: "popupsWrapper-container",
  freePremiumPopup: "popupsWrapper-freePremium",
  paymentMethodPopup: "popupsWrapper-paymentMethod"
}

export const PopupsWrapper: React.FC = ({ children }) => {
  const { userStatus, updateUserStatus, userPayment } = useContext(UserContext)
  const [ popupToShow, setPopupToShow ] = useState(null)

  const showFreePremiumPopup = (status?: string): boolean => {
    return status !== "FREE" && status !== "PREMIUM" && appConfig.acceptFree
  }

  const showPaymentMethodPopup = (hasPayment: boolean, status?: string): boolean => {
    return (status === "PREMIUM" && !hasPayment) ||
      (status !== "FREE" && status !== "PREMIUM" && !appConfig.acceptFree)
  }

  useEffect(() => {
    if (showFreePremiumPopup(userStatus)) {
      setPopupToShow("freePremium")
    } else if (showPaymentMethodPopup(userPayment !== null, userStatus)) {
      setPopupToShow("paymentMethod")
    } else {
      setPopupToShow(null)
    }
  }, [userStatus, userPayment]);

  return (
    <div data-testid={dataTestIds.container}>
      { !popupToShow &&
        <UpgradeBanner openPopup={setPopupToShow} />}

      { popupToShow === "freePremium" &&
        <FreePremiumPopup
          dataTestid={dataTestIds.freePremiumPopup}
          freeClickCallback={(): void => { updateUserStatus("FREE") }}
          premiumClickCallback={(): void => { updateUserStatus("PREMIUM") }}
        />}

      { popupToShow === "paymentMethod" &&
        <PaymentMethodPopup
          dataTestid={dataTestIds.paymentMethodPopup}
        />}

      { !popupToShow && children}
    </div>
  )
}
