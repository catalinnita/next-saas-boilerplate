import React from "react"
import Head from "next/head"
import { NextPage } from "next"
import { Link, Flex } from "rebass"

export const dataTestIds = {
  container: "index-page"
}

const Page: NextPage = () => {
  return (
    <div data-testid={dataTestIds.container}>
      <Head>
        <title>Next Saas boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex width="100%" justifyContent="center">
          <Link padding="0.2rem" href="/api/auth/login">Login</Link>
          <Link padding="0.2rem" href="/api/auth/register">Create account</Link>
        </Flex>
      </main>

    </div>
  )
}

export default Page
