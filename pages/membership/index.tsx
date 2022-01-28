import React, { useEffect } from "react"
import Head from "next/head"
import { IncomingMessage, ServerResponse } from "http"
import { Box, Flex } from "rebass"
import { useDispatch } from "react-redux"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { Header } from "../../components/header"
import { PopupsWrapper } from "../../components/popupsWrapper"
import { BlockCards } from "../../components/blockCards"
import { BlockInvoices } from "../../components/blockInvoices"
import { BlockSubscription } from "../../components/blockSubscription"
import { NavigationSidebar } from "../../components/navigationSidebar"
import { setUser } from "../../state/slices/user"
import { getCustomer } from "../../state/slices/customer"
import { UpgradeBanner } from "../../components/upgradeBanner"
import { useStateSelector } from "../../utils/useStateSelector"

export interface Props {
  user?: Record<string, any>
  token?: string
  res: ServerResponse
  req: IncomingMessage
}

export const dataTestIds = {
  container: "membership-page",
}

const Page: React.FC<Props> = (props) => {
  const { user } = props
  const dispatch = useDispatch()

  const customer = useStateSelector("customer")
  useEffect(() => {
    dispatch(setUser(user))
    dispatch(getCustomer(user.name))
  }, [dispatch, user])

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

          <Flex
            width="100%"
            maxWidth="1080px"
            py="32px"
            mx="auto"
            justifyContent="flex-start"
            minHeight="80vh"
          >
            <Box width={1 / 4} mr="32px">
              <NavigationSidebar />
            </Box>

            <Box width={3 / 4} minHeight="80vh">
              <BlockSubscription customerId={customer.id} />

              <BlockCards customerId={customer.id} />

              <BlockInvoices customerId={customer.id} />
            </Box>
          </Flex>
        </PopupsWrapper>
      </Flex>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()

export default Page
