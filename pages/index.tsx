import React from "react"
import Head from "next/head"
import { NextPage } from "next"

const Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Next Saas boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Hello world
        </h1>
      </main>

    </div>
  )
}

export default Page
