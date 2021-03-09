import React from "react"
import { Box, Flex, Heading, Link } from "rebass"
import { NextPage, NextPageContext } from "next"
import Head from "next/head"
import { auth0, getToken, useUser } from "../../utils/auth0"
import { useStripe } from "../../utils/stripe"
import { FormPassword } from "../../components/formPassword"
import { FormProfile } from "../../components/formProfile"
import { Navigation } from "../../components/navigation"

export interface Props {
  userId?: string,
  token?: string
}

export const dataTestIds = {
  container: "profile-page"
}

const Page: NextPage<Props> = ({ userId, token }) => {
  const title = "Profile page"
  const { user, setUser } = useUser(userId, token)
  const { userStatus } = useStripe(user?.app_metadata?.stripe_customer_id)

  return (
    <div data-testid={dataTestIds.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <Flex maxWidth="1080px" p={3} mx="auto" justifyContent="space-between">
        <Heading>{title}</Heading>
        <Link href="/api/logout">Logout</Link>
      </Flex>

      <Flex maxWidth="1080px" p={3} mx="auto" justifyContent="flex-start">
        <Box width={1 / 4}>
          <Navigation />
        </Box>
        <Box width={3 / 4}>
          {user && <FormProfile user={user} token={token} setUser={setUser} />}
          {user && <FormPassword user={user} token={token} />}
        </Box>

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
