import React from "react"
import Head from "next/head"
import { NextPage } from "next"
import { Link, Flex } from "rebass"

const Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Next Saas boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex width="100%" justifyContent="center">
          <Link padding="0.2rem" href="/api/login">Login</Link>
          <Link padding="0.2rem" href="/api/register">Create account</Link>
        </Flex>
      </main>

    </div>
  )
}

export default Page
