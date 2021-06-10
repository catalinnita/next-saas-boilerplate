import React, { useState, useEffect, useContext } from "react"
import appConfig from "../config/appConfig"
import { FreePremiumPopup } from "./freePremiumPopup"
import { PaymentMethodPopup } from "./paymentMethodPopup"
import { UserContext } from "../context/userContext"
import { UpgradeBanner } from "./upgradeBanner"
import { useStripe } from "../utils/useStripe"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../state/store"
import { showPopup, closeAllPopups } from "../state/slices/popups"

export const dataTestIds = {
  container: "popupsWrapper-container",
  freePremiumPopup: "popupsWrapper-freePremium",
  paymentMethodPopup: "popupsWrapper-paymentMethod"
}

export type Props = {
  defaultPopup?: string
}

export const PopupsWrapper: React.FC<Props> = ({ children, defaultPopup }) => {
  // const { user, userStatus, updateUserStatus } = useContext(UserContext)

  const dispatch = useDispatch()
  const { popupToShow } = useSelector((state: RootState) => state.popups)
  const { status } = useSelector((state: RootState) => state.subscription)

  // const { userPayment } = useStripe(user)

  // const showFreePremiumPopup = (status?: string): boolean => {
  //   return status !== "FREE" && status !== "PREMIUM" && appConfig.acceptFree
  // }

  // const showPaymentMethodPopup = (hasPayment: boolean, status?: string): boolean => {
  //   return (status === "PREMIUM" && !hasPayment) ||
  //     (status !== "FREE" && status !== "PREMIUM" && !appConfig.acceptFree)
  // }

  // useEffect(() => {
  //   if (showFreePremiumPopup(userStatus)) {
  //     setPopupToShow("freePremium")
  //   } else if (defaultPopup === "paymentMethod" || showPaymentMethodPopup(userPayment !== null, userStatus)) {
  //     setPopupToShow("paymentMethod")
  //   } else {
  //     setPopupToShow(null)
  //   }
  // }, [userStatus, userPayment, defaultPopup]);

  return (
    <div data-testid={dataTestIds.container}>
    {/* { !popupToShow && ( status === 'canceled' || status === null ) &&
        <UpgradeBanner openPopup={(popupName) => { dispatch(showPopup({popup: popupName})) }} />} */}

      {/* { popupToShow === "freePremium" &&
        <FreePremiumPopup
          dataTestid={dataTestIds.freePremiumPopup}
          freeClickCallback={(): void => { updateUserStatus("FREE") }}
          premiumClickCallback={(): void => { updateUserStatus("PREMIUM") }}
        />} */}

      { popupToShow === "paymentMethod" &&
        <PaymentMethodPopup
        dataTestid={dataTestIds.paymentMethodPopup}
        />}

      { !popupToShow && children }
    </div>
  )
}
