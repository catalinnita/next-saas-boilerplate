import React from "react"
import { Box, Flex, Heading, Link } from "rebass"
import { NextPage, NextPageContext } from "next"
import Head from "next/head"
import { IncomingMessage, ServerResponse } from "http"
import { Navigation } from "../../components/navigation"
import { PopupsWrapper } from "../../components/popupsWrapper"
import { subscriptionActiveMock } from "../../__tests__/_mockSubscription"
import { SubscriptionDetails } from "../../components/subscriptionDetails"

interface Props {
  res: ServerResponse
  req: IncomingMessage
}

export const dataTestIds = {
  container: "dashboard-page"
}

const Page: NextPage = () => {

  const title = "Membership"

  return (
    <div data-testid={dataTestIds.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <Flex justifyContent="flex-start" flexDirection="column">

        <PopupsWrapper>

          <Flex width="100%" maxWidth="1080px" p={3} mx="auto" justifyContent="space-between">
            <Heading>{title}</Heading>
            <Link href="/api/logout">Logout</Link>
          </Flex>

          <Flex width="100%" maxWidth="1080px" p={3} mx="auto" justifyContent="flex-start">
            <Box width={1 / 4}>
              <Navigation />
            </Box>
            <Box width={3 / 4}>
              <SubscriptionDetails subscription={subscriptionActiveMock} />
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
