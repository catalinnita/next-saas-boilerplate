import React, { useEffect } from "react"
import Head from "next/head"
import { NextPage, NextPageContext } from "next"
import { IncomingMessage, ServerResponse } from "http"
import { Box, Flex } from "rebass"
import { Header } from "../../components/header"
import { PopupsWrapper } from "../../components/popupsWrapper"
import { BlockCards } from "../../components/blockCards"
import { BlockInvoices } from "../../components/blockInvoices"
import { BlockSubscription } from "../../components/blockSubscription"
import { NavigationSidebar } from "../../components/navigationSidebar"
import { useDispatch } from 'react-redux'
import { setUser, setToken } from '../../state/slices/user'
import { getCustomer } from '../../state/slices/customer'
import { UpgradeBanner } from "../../components/upgradeBanner"
import { useStateSelector } from "../../utils/useStateSelector"

export interface Props {
  user?: Record<string, any>,
  token?: string,
  res: ServerResponse
  req: IncomingMessage
}

export const dataTestIds = {
  container: "membership-page"
}

const Page: NextPage = (props) => {
  const { token, user: initialUser } = props
  const dispatch = useDispatch()

  const customer = useStateSelector("customer")
  useEffect(() => {
    dispatch(setUser(initialUser))
    dispatch(setToken(token))
    dispatch(getCustomer(initialUser.name))
  }, [token, initialUser])

  const title = "Membership page"

  return (
    <div data-testid={dataTestIds.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <Flex justifyContent="flex-start" flexDirection="column">

        <PopupsWrapper>

          <Header />
          <UpgradeBanner customerId={customer.id} />

          <Flex width="100%" maxWidth="1080px" py="32px" mx="auto" justifyContent="flex-start" minHeight="80vh">

            <Box width={1 / 4}  mr="32px">
              <NavigationSidebar />
            </Box>

            <Box
              width={3 / 4} minHeight="80vh">

              <BlockSubscription
                customerId={customer.id}
              />

              <BlockCards
                customerId={customer.id}
              />

              <BlockInvoices
                customerId={customer.id}
              />

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
