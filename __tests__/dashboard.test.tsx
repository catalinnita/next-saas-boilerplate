import React from "react"
import { render } from "@testing-library/react"
import Page, { dataTestIds } from "../pages/dashboard"

import auth0 from '../utils/auth0'

it("should render the Page", async () => {
  const { getByTestId } = render(<Page />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it("should redirect in getInitialProps if session is not defined", async () => {
  auth0.getSession = jest.fn()
  const writeHead = jest.fn()
  await Page.getInitialProps({
    // @ts-ignore
    res: {
      writeHead: writeHead,
      end: jest.fn()
    }
  });

  expect(writeHead).toBeCalledWith(
    302,
    {"Location": "/api/login"}
  );
})

it("should return the getInitialProps if session is defined", async () => {
  jest.clearAllMocks()
  // @ts-ignore
  auth0.getSession = jest.fn(() => ({
      sessionId: 1
    })
  )
  const inialProps = await Page.getInitialProps(
    // @ts-ignore
    { asPath: 'asPath', }
  );
  expect(inialProps).toMatchObject({ asPath: 'asPath' });
})
