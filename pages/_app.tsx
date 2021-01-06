import App, { AppProps } from "next/app"
import React from "react"

class MyApp extends App<AppProps> {
  render(): React.ReactElement {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp
