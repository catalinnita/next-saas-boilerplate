import React, { useContext, useEffect } from "react"
import { Box, Flex, Heading, Link } from "rebass"
import { NextPage, NextPageContext } from "next"
import Head from "next/head"
import { IncomingMessage, ServerResponse } from "http"
import { UserContext } from "../../context/userContext"
import { FormPassword } from "../../components/formPassword"
import { FormProfile } from "../../components/formProfile"
import { Header } from "../../components/header"
import { NavigationSidebar } from "../../components/navigationSidebar"
import { useDispatch, useSelector } from "react-redux"
import { setToken, setUser, updateProfile, updatePassword } from "../../state/slices/user"
import { RootState } from "../../state/store"
import { showPopup } from "../../state/slices/popups"
import { UpgradeBanner } from "../../components/upgradeBanner"

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

  const subscription = useSelector((state: RootState) => state.subscription)
  const { popupToShow } = useSelector((state: RootState) => state.popups)


  useEffect(() => {
    dispatch(setUser(initialUser))
    dispatch(setToken(token))
  }, [token, initialUser])

  const title = "Profile page"

  return (
    <div data-testid={dataTestIds.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <Flex justifyContent="flex-start" flexDirection="column">
        <Header />

        <UpgradeBanner />

        <Flex width="100%" maxWidth="1080px" py="32px" mx="auto" justifyContent="flex-start" minHeight="80vh">

          <Box width={1 / 4} mr="32px">
            <NavigationSidebar />
          </Box>

          <Box width={3 / 4} minHeight="80vh">
            {initialUser && <FormProfile />}
            {initialUser && <FormPassword />}
          </Box>
        </Flex>

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
