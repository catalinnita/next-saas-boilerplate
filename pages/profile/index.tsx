import React, { useContext, useEffect } from "react"
import { Box, Flex, Heading, Link } from "rebass"
import { NextPage, NextPageContext } from "next"
import Head from "next/head"
import { IncomingMessage, ServerResponse } from "http"
import { UserContext } from "../../context/userContext"
import { FormPassword } from "../../components/formPassword"
import { FormProfile } from "../../components/formProfile"
import { Navigation } from "../../components/navigation"
import { SidebarNavigation } from "../../components/sidebarNavigation"
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
        <Navigation />

        {!popupToShow && (subscription.status === 'canceled' || subscription.status === null) &&
              <Box width="100%" maxWidth="1080px" pt="32px" mx="auto">
                <UpgradeBanner openPopup={(popupName) => { dispatch(showPopup({popup: popupName})) }} />
              </Box>}

        <Flex width="100%" maxWidth="1080px" py="32px" mx="auto" justifyContent="flex-start" minHeight="80vh">
          <Box width={1 / 4} mr="32px">
            <SidebarNavigation />
          </Box>
          <Box width={3 / 4} minHeight="80vh">
            {initialUser && <FormProfile user={initialUser} token={token} setUser={(userDetails) => { dispatch(updateProfile(userDetails)) }} />}
            {initialUser && <FormPassword user={initialUser} token={token} setUser={(userPassword) => { dispatch(updatePassword(userPassword)) }} />}
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
