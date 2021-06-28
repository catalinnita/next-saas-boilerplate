import React, { useEffect } from "react"
import Head from "next/head"
import { Box, Flex } from "rebass"
import { NextPage, NextPageContext } from "next"
import { IncomingMessage, ServerResponse } from "http"
import { Header } from "../../components/header"
import { PopupsWrapper } from "../../components/popupsWrapper"
import { UpgradeBanner } from "../../components/upgradeBanner"
import { customer, getCustomer } from "../../state/slices/customer"
import { setToken, setUser } from "../../state/slices/user"
import { useStateSelector } from "../../utils/useStateSelector"
import { useDispatch } from "react-redux"

export interface Props {
  user?: Record<string, any>,
  token?: string,
  res: ServerResponse
  req: IncomingMessage
}

export const dataTestIds = {
  container: "dashboard-page"
}

const Page: NextPage<Props> = (props) => {
  const { token, user: initialUser } = props
  const dispatch = useDispatch()

  const customer = useStateSelector("customer")

  useEffect(() => {
    dispatch(setUser(initialUser))
    dispatch(setToken(token))
    dispatch(getCustomer(initialUser.name))
  }, [token, initialUser])

  const title = "Dashboard page"

  return (
    <div data-testid={dataTestIds.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <Flex justifyContent="flex-start" flexDirection="column">

        <PopupsWrapper>

          <Header />
          <UpgradeBanner customerId={customer.id} />

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
