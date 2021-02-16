import React from "react"
import { Box, Flex, Heading, Link } from "rebass"
import { NextPage, NextPageContext } from "next"
import Head from "next/head"
import { auth0, getToken, getUserById } from "../../utils/auth0"
import { FormPassword } from "../../components/formPassword"
import { FormProfile } from "../../components/formProfile"
import { Navigation } from "../../components/navigation"

export interface Props {
  user?: Record<any, any>
  token?: string
}

export const dataTestIds = {
  container: "profile-page"
}

const Page: NextPage<Props> = ({ user, token }) => {
  const title = "Profile page"

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
          <FormProfile user={user} token={token} />
          <FormPassword user={user} token={token} />
        </Box>

      </Flex>
    </div>
  )
}

Page.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { res, req } = ctx

  const session = await auth0.getSession(req);
  if (!session) {
    res.writeHead(302, { Location: "/api/login" });
    res.end();
    return;
  }

  const token = await getToken()
  const user = await getUserById(session.user.sub, token.access_token)

  if (!user) {
    res.writeHead(302, { Location: "/api/login" });
    res.end();
    return;
  }

  return {
    user,
    token: token.access_token,
   }
}


export default Page
