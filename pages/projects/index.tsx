import React, { useEffect } from "react"
import Head from "next/head"
import { Box, Flex } from "rebass"
import { NextPage, NextPageContext } from "next"
import { IncomingMessage, ServerResponse } from "http"
import { Header } from "../../components/header"
import { NavigationSidebar } from "../../components/navigationSidebar"
import { useDispatch, useSelector } from "react-redux"
import { setToken, setUser } from "../../state/slices/user"
import { UpgradeBanner } from "../../components/upgradeBanner"
import { getCustomer } from "../../state/slices/customer"
import { useStateSelector } from "../../utils/useStateSelector"
import { PopupsWrapper } from "../../components/popupsWrapper"
import { BlockProjects } from "../../components/blockProjects"

export interface Props {
  user?: Record<string, any>,
  token?: string,
  res: ServerResponse
  req: IncomingMessage
}

export const dataTestIds = {
  container: "profile-page"
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

  const title = "Projects page"

  return (
    <div data-testid={dataTestIds.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <Flex justifyContent="flex-start" flexDirection="column">

        <PopupsWrapper>

          <Header />
          <UpgradeBanner customerId={customer.id} />

          <Flex width="100%" maxWidth="1080px" py="32px" mx="auto" justifyContent="flex-start" minHeight="80vh">

            <Box width={1 / 4} mr="32px">
              <NavigationSidebar />
            </Box>

            <Box width={3 / 4} minHeight="80vh">
              <BlockProjects />
              {/* <NewProject /> */}
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
