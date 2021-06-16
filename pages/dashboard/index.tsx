import React from "react"
import { Box, Flex } from "rebass"
import { NextPage, NextPageContext } from "next"
import Head from "next/head"
import { IncomingMessage, ServerResponse } from "http"
import { Header } from "../../components/header"
import { PopupsWrapper } from "../../components/popupsWrapper"

interface Props {
  res: ServerResponse
  req: IncomingMessage
}

export const dataTestIds = {
  container: "dashboard-page"
}

const Page: NextPage = () => {

  const title = "Dashboard page"

  return (
    <div data-testid={dataTestIds.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <Flex justifyContent="flex-start" flexDirection="column">

        <PopupsWrapper>

          <Header />

          <Flex width="100%" maxWidth="1080px" p={3} mx="auto" justifyContent="flex-start">
            <Box width={3 / 4}>
              Build your SPA here
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
