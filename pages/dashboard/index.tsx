import React from "react"
import { NextPage, NextPageContext } from "next"
import Head from "next/head"
import auth0 from '../../utils/auth0'
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
      <h1>{title}</h1>
    </div>
  )
}


Page.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { asPath, res, req } = ctx
  const session = await auth0.getSession(req);

  if (!session) {
    res.writeHead(302, { Location: `https://${req.headers.host}/api/login` });
    res.end();
    return;
  }

  return { asPath }
}

export default Page
