import React, { useState, useEffect } from "react"
import { Box, Flex } from "rebass"
import { NextPage, NextPageContext } from "next"
import Head from "next/head"
import { IncomingMessage, ServerResponse } from "http"
import { Navigation } from "../../components/navigation"
import { PopupsWrapper } from "../../components/popupsWrapper"
import { PaymentMethods } from "../../components/paymentMethods"
import { Invoices } from "../../components/invoices"
import { SubscriptionDetails } from "../../components/subscriptionDetails"
import { SidebarNavigation } from "../../components/sidebarNavigation"
import { useSelector, useDispatch } from 'react-redux'

import { setUser, setToken } from '../../state/slices/user'
import { getCustomer, updateDefaultCard } from '../../state/slices/customer'
import { getSubscription, cancelSubscription, activateSubscription } from '../../state/slices/subscription/async'
import { getCards, removeCard, attachCard } from '../../state/slices/cards'
import { getInvoices, loadMoreInvoices } from '../../state/slices/invoices'
import { RootState } from "../../state/store"
import { UpgradeBanner } from "../../components/upgradeBanner"
import { showPopup } from "../../state/slices/popups"

interface Props {
  res: ServerResponse
  req: IncomingMessage
}

export const dataTestIds = {
  container: "dashboard-page"
}

const Page: NextPage = (props) => {
  const { token, user: initialUser } = props
  const dispatch = useDispatch()

  const customer = useSelector((state: RootState) => state.customer)
  const subscription = useSelector((state: RootState) => state.subscription)
  const cards = useSelector((state: RootState) => state.cards)
  const invoices = useSelector((state: RootState) => state.invoices)
  const { popupToShow } = useSelector((state: RootState) => state.popups)

  useEffect(() => {
    dispatch(setUser(initialUser))
    dispatch(setToken(token))
    dispatch(getCustomer(initialUser.email))
  }, [token, initialUser])

  useEffect(() => {
    if (customer.id) {
      dispatch(getSubscription(customer.id))
      dispatch(getCards(customer.id))
      dispatch(getInvoices(customer.id))
    }
  }, [customer])


  const [ defaultPopup, setDefaultPopup ] = useState('null')
  // const { updateCustomer, removeCard, cancelSubscription, createSubscription } = useStripe(user)

  // const updateCustomerCallback = async (cardId: string) => {
    // const update = await updateCustomer(customer.id, cardId)
  // }
  const title = "Dashboard page"

  return (
    <div data-testid={dataTestIds.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <Flex justifyContent="flex-start" flexDirection="column">

        <PopupsWrapper defaultPopup={defaultPopup}>
          <Navigation />

          {!popupToShow && (subscription.status === 'canceled' || subscription.status === null) &&
              <Box width="100%" maxWidth="1080px" pt="32px" mx="auto">
                <UpgradeBanner openPopup={(popupName) => { dispatch(showPopup({popup: popupName})) }} />
              </Box>}

          <Flex width="100%" maxWidth="1080px" py="32px" mx="auto" justifyContent="flex-start" minHeight="80vh">

            <Box width={1 / 4}  mr="32px">
              <SidebarNavigation />
            </Box>

            <Box
              width={3 / 4} minHeight="80vh">

              {subscription &&
                <SubscriptionDetails
                  subscription={subscription}
                  cancelSubscriptionCallback={() => dispatch(cancelSubscription(subscription.id))}
                  activateSubscriptionCallback={() => dispatch(activateSubscription(customer.id))}
                />
              }

              {cards?.cardsList && <PaymentMethods
                cards={cards.cardsList}
                defaultCard={customer.defaultCardId}
                updateDefaultCard={(cardId: string) => dispatch(updateDefaultCard({ customerId: customer.id, sourceId: cardId }))}
                removeCard={(cardId: string) => dispatch(removeCard({ customerId: customer.id, sourceId: cardId }))}
                setDefaultPopup={setDefaultPopup}
              />}

              {invoices?.invoicesList &&
                <Invoices invoices={invoices.invoicesList} hasMore={invoices.hasMore} loadMore={(lastObject) => dispatch(loadMoreInvoices({ customerId: customer.id, lastObject }))} />}
            </Box>
          </Flex>

        </PopupsWrapper>

      </Flex>
    </div>
  )
}

Page.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { res, req } = ctx

  return {
    res,
    req,
  }
}

export default Page
