import React from "react"
import { render } from "@testing-library/react"
import Page, { dataTestIds, Props } from "../pages/profile"

import { auth0, getToken, getUserById } from "../utils/auth0"

const props: Props = {
  user: {
    email: "test@test.com",
    nickname: "Joe",
  },
  token: "token"
}


jest.mock("../utils/auth0", () => ({
  auth0: jest.fn(),
  getToken: jest.fn(),
  getUserById: jest.fn()
}));

it("should render the Profile page", async () => {
  const { getByTestId } = render(<Page {...props} />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})


it("Profile page should redirect if session is not defined", async () => {
  auth0.getSession = jest.fn()
  // @ts-ignore
  getUserById.mockImplementation(() => null)
  // @ts-ignore
  getToken.mockImplementation(() => null)
  const writeHead = jest.fn()
  await Page.getInitialProps({
    // @ts-ignore
    res: {
      writeHead,
      end: jest.fn()
    }
  });

  expect(writeHead).toBeCalledWith(
    302,
    {"Location": "/api/login"}
  );
})

it("Profile page should redirect if user is not defined", async () => {
  // @ts-ignore
  auth0.getSession = jest.fn(() => ({
    sessionId: 1,
    user: {
      sub: "subId",
    }
  }))
  // @ts-ignore
  getUserById.mockImplementation(() => null)
  // @ts-ignore
  getToken.mockImplementation(() => ({
    access_token: "someToken",
  }))
  const writeHead = jest.fn()
  await Page.getInitialProps({
    // @ts-ignore
    res: {
      writeHead,
      end: jest.fn()
    },
  });

  expect(writeHead).toBeCalledWith(
    302,
    {"Location": "/api/login"}
  );
})

it("should return the getInitialProps for Profile page if session is defined", async () => {
  // @ts-ignore
  auth0.getSession = jest.fn(() => ({
    sessionId: 1,
    user: {
      sub: "subId",
    }
  }))
  // @ts-ignore
  getUserById.mockImplementation(() => ({
    email: "test@test.com",
  }))
  // @ts-ignore
  getToken.mockImplementation(() => ({
    access_token: "someToken",
  }))
  const writeHead = jest.fn()
  const inialProps = await Page.getInitialProps({
    // @ts-ignore
    res: {
      writeHead,
      end: jest.fn()
    },
  });

  expect(inialProps).toMatchObject({
    "token": "someToken",
    "user": {
      "email": "test@test.com",
    },
  });
})
