import React from 'react'
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'

interface Props {
}

export const dataTestIds = {
  container: 'dashboard-page'
}

const Page: NextPage<Props> = (props) => {
  const title = "Dashboard page"
  return (
    <div data-testid={dataTestIds.container}>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
    </div>
  )
}


Page.getInitialProps = async ({ req, res }: NextPageContext): Promise<Props> => {
  return { res }
}

export default Page
