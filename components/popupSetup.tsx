import React, { useEffect } from "react"
import { Box, Flex, Heading, Link, Text } from "rebass"
import { Popup } from "./popup"
import { StripeElementsProvider } from "./stripeElementsProvider"
import { useDispatch } from "react-redux"
import { useStateSelector } from "../utils/useStateSelector"
import { attachCard } from "../state/slices/cards"
import { closeAllPopups } from "../state/slices/popups"
import { FormCreditCard } from "./formCreditCard"
import { createSubscription } from "../state/slices/subscription"
import { createCustomer } from "../state/slices/customer"
import store, { RootState } from "../state/store"
import appConfig from "../config/appConfig"
import { setCookie, parseCookies } from 'nookies'

export const dataTestIds = {
  container: "popup-setup-container",
  skipLink: "popup-setup-skip-link"
}

export type Props = {
  showCloseButton?: boolean,
  showSkipLink?: boolean
}

export const PopupSetup: React.FC<Props> = ({
  showSkipLink,
  showCloseButton,
}) => {
  const dispatch = useDispatch() as typeof store.dispatch
  const user = useStateSelector("user")
  const { setupPopupDisplayed } = parseCookies()

  const setPopupShownCookie = () => {
    if (setupPopupDisplayed) return
    setCookie(null, "setupPopupDisplayed", "1", {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
    })
  }

  const onSubmitCallback = async ({ cardToken }: Record<string, any>) => {
    dispatch(createCustomer(user.username)).then(res => {
      Promise.all([
        dispatch(attachCard({ cardToken })),
        dispatch(createSubscription())
      ]).then((values) => {
        dispatch(closeAllPopups())
      })
    })
  }
  return (
      <Popup showCloseButton={showCloseButton}>
        <Box data-testid={dataTestIds.container}>
        <Heading pb="8px">Start an incredible journey</Heading>
        <Text fontSize="14px">{`You must add a payment method in order to start your trial. You will be changed £10/month.`}</Text>
        <StripeElementsProvider>
          <FormCreditCard
            buttonText={`Start ${appConfig.trialPeriod} days trial`}
            onSubmitCallback={(args) => { onSubmitCallback(args) }}
          />
        </StripeElementsProvider>
        {/* add logic for free or setup subscription without CC */}
        {showSkipLink
        && <Flex>
          <Text
            data-testid={dataTestIds.skipLink}
            variant="skipLink"
            onClick={() => {
              setPopupShownCookie()
              dispatch(closeAllPopups())
            }}>Thank you but I want the crappy free version!</Text>
          </Flex>
        }
        </Box>
      </Popup>

  )
}
