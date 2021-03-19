import React from "react"
import App, { AppProps } from "next/app"
import { Router } from "next/dist/client/router"
import { AppContextType, AppInitialProps } from "next/dist/next-server/lib/utils"
import { ThemeProvider } from "theme-ui"
import { theme } from "../config/theme"
import { auth0, getToken, getUser } from "../utils/auth0"
import { UserContextProvider } from "../context/userContext"

class MyApp extends App<AppProps> {
  render(): React.ReactElement {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <UserContextProvider pageProps={pageProps}>
          <Component {...pageProps} />
        </UserContextProvider>
      </ThemeProvider>)
  }
}

MyApp.getInitialProps = async (ctx: AppContextType<Router>):Promise<AppInitialProps> => {
  const { pageProps } = await App.getInitialProps(ctx);

  if (pageProps.req) {
    const { res, req } = pageProps

    // check if user is logged in
    const session = await auth0.getSession(req)

    // if it's not logged in redirect to login page
    if (!session) {
      res.writeHead(302, { Location: "/api/login" })
      res.end()
    }

    // generate a token for auth0 requests
    const token = await getToken()

    // get user details, including stripe_customer_id
    const user = await getUser(session.user.sub, token)
    if (!user.user_id) {
      res.writeHead(302, { Location: "/api/login" })
      res.end()
    }

    return {
      pageProps: {
        token,
        user,
      }
    }
  }

  return {
    pageProps: {}
  }
}


export default MyApp
