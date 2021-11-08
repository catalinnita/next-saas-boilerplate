import React, { useEffect } from "react"
import Head from "next/head"
import { Box, Flex } from "rebass"
import { NextPage } from "next"
import { IncomingMessage, ServerResponse } from "http"
import { useDispatch } from "react-redux"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { Header } from "../../components/header"
import { PopupsWrapper } from "../../components/popupsWrapper"
import { UpgradeBanner } from "../../components/upgradeBanner"
import { getCustomer } from "../../state/slices/customer"
import { setUser } from "../../state/slices/user"
import { useStateSelector } from "../../utils/useStateSelector"
import { EventsPerDay } from "../../components/eventsPerDay"
import { MostFiredEvents } from "../../components/mostFiredEvents"

export interface Props {
  user?: Record<string, any>,
  token?: string,
  res: ServerResponse
  req: IncomingMessage
}

export const dataTestIds = {
  container: "dashboard-page"
}

const Page: NextPage<Props> = (props) => {
  const { user } = props
  const dispatch = useDispatch()

  const customer = useStateSelector("customer")

  useEffect(() => {
    dispatch(setUser(user))
    dispatch(getCustomer(user.name))
  }, [dispatch, user])

  const title = "Dashboard page"

  return (
    <div data-testid={dataTestIds.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <Flex justifyContent="flex-start" flexDirection="column">

        <PopupsWrapper>

          <Header />
          <UpgradeBanner customerId={customer.id} />

          <Flex width="90%" maxWidth="1600px" p={3} mx="auto" justifyContent="flex-start">
            <Box width={1/2} p="12px">
              <EventsPerDay />
            </Box>
            <Box width={1/2} p="12px">
              <MostFiredEvents />
            </Box>
          </Flex>

        </PopupsWrapper>

      </Flex>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired();

export default Page
