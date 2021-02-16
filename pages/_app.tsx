import App, { AppProps } from "next/app"
import React from "react"
import { ThemeProvider } from "theme-ui"
import { theme } from "../config/theme"

class MyApp extends App<AppProps> {
  render(): React.ReactElement {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>)
  }
}

export default MyApp
