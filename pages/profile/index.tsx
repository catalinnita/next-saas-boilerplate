import React, { useContext } from "react"
import { Box, Flex, Heading, Link } from "rebass"
import { NextPage, NextPageContext } from "next"
import Head from "next/head"
import { IncomingMessage, ServerResponse } from "http"
import { auth0, getToken, useUser } from "../../utils/auth0"
import { useStripe } from "../../utils/stripe"
import { UserContext } from "../../context/userContext"
import { FormPassword } from "../../components/formPassword"
import { FormProfile } from "../../components/formProfile"
import { Navigation } from "../../components/navigation"

export interface Props {
  userId?: string,
  token?: string,
  res: ServerResponse
  req: IncomingMessage
}

export const dataTestIds = {
  container: "profile-page"
}

const Page: NextPage<Props> = ({ userId, token }) => {
  const title = "Profile page"
  const { user, setUser } = useContext(UserContext)

  console.log({ user })

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
          {user && <FormPassword user={user} token={token} setUser={setUser} />}
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
