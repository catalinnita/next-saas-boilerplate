import Cookies from "js-cookie"
import React, { useState, useEffect } from "react"
import appConfig from "../config/appConfig"
import { FreePremiumPopup } from "./freePremiumPopup"
import { PaymentMethodPopup } from "./paymentMethodPopup"


export const dataTestIds = {
  container: "popupsWrapper-container",
  freePremiumPopup: "popupsWrapper-freePremium",
  paymentMethodPopup: "popupsWrapper-paymentMethod"
}

export type Props = {
  userStatus?: "FREE" | "PREMIUM",
  setUserStatus?: (userStats: string) => void,
  userPayment?: string,
}

export const PopupsWrapper: React.FC<Props> = ({ userStatus, setUserStatus, userPayment, children }) => {
  const [popupToShow, setPopupToShow] = useState(null)

  const setFree = (): void => {
    Cookies.set("userStatus", "FREE", { expires: 30 })
    setUserStatus("FREE")
  }
  const setPremium = (): void => {
    Cookies.set("userStatus", "PREMIUM", { expires: 30 })
    setUserStatus("PREMIUM")
  }

  const showFreePremiumPopup = (status?: string): boolean => {
    return status !== "FREE" && status !== "PREMIUM" && appConfig.acceptFree
  }

  const showPaymentMethodPopup = (status?: string, payment?: string): boolean => {
    return (status === "PREMIUM" && !payment) ||
      (status !== "FREE" && status !== "PREMIUM" && !appConfig.acceptFree)
  }

  useEffect(() => {
    if (showFreePremiumPopup(userStatus)) {
      setPopupToShow("freePremium")
    } else if (showPaymentMethodPopup(userStatus, userPayment)) {
      setPopupToShow("paymentMethod")
    } else {
      setPopupToShow(null)
    }
  }, [userStatus, userPayment]);

  console.log({ popupToShow })
  console.log({userStatus})

  return (
    <div data-testid={dataTestIds.container}>
      { popupToShow === "freePremium" &&
        <FreePremiumPopup
          dataTestid={dataTestIds.freePremiumPopup}
          freeClickCallback={setFree}
          premiumClickCallback={setPremium}
        />}

      { popupToShow === "paymentMethod" &&
        <PaymentMethodPopup
          dataTestid={dataTestIds.paymentMethodPopup}
        />}

      { !popupToShow && children}
    </div>
  )
}
