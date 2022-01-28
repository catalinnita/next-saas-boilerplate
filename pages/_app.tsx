import React from "react"
import App, { AppProps } from "next/app"
import { ThemeProvider } from "theme-ui"
import Head from "next/head"
import { Provider } from "react-redux"
import { UserProvider } from "@auth0/nextjs-auth0";
import { theme } from "../config/theme"

import store from "../state/store"
import "../components/formCreditCard.css"

export const dataTestIds = {
  themeProvider: "app-theme-provider",
  storeProvider: "app-store-provider",
  component: "app-theme-component",
}
class MyApp extends App<AppProps> {

  render(): React.ReactElement {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme} data-testid={dataTestIds.themeProvider}>
        <UserProvider>
          <Provider store={store} data-testid={dataTestIds.storeProvider}>
            <Head>
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap" rel="stylesheet" />
              <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
              <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            <Component {...pageProps} />
          </Provider>
        </UserProvider>
      </ThemeProvider>)
  }
}

export default MyApp
