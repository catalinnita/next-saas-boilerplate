import React from "react"
import { Flex, Heading, Link } from "rebass"
import { NextPage, NextPageContext } from "next"
import Head from "next/head"
import { auth0 } from "../../utils/auth0"

interface Props {
  asPath?: string
}

export const dataTestIds = {
  container: "dashboard-page"
}

const Page: NextPage<Props> = (props) => {
  const title = "Dashboard page"
  return (
    <div data-testid={dataTestIds.container}>
      <Head>
        <title>{title}</title>
      </Head>
      <Flex maxWidth="1080px" mx="auto" justifyContent="space-between">
        <Heading>{title}</Heading>
        <Link href="/api/logout">Logout</Link>
      </Flex>
      <Flex maxWidth="1080px" mx="auto" justifyContent="space-between" flexDirection="column">
        <a href="/dashboard">Dashboard</a>
        <a href="/profile">Profile</a>
      </Flex>
    </div>
  )
}


Page.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { asPath, res, req } = ctx
  const session = await auth0.getSession(req);

  if (!session) {
    res.writeHead(302, { Location: "/api/login" });
    res.end();
    return;
  }

  return { asPath }
}

export default Page
