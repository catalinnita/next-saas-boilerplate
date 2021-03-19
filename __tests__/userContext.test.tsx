import React, { useContext } from "react"
import { render, waitFor } from "@testing-library/react"
import { UserContext, UserContextProvider } from "../context/userContext"
import * as auth0 from "../utils/auth0";

const mockedPageProps = {
  token: "",
  user: {}
}

jest.mock("../utils/auth0", () => ({
  updateUserById: jest.fn(() => Promise.resolve({ data: {} }))
}))


const TestComponent: React.FC = () => {
  const { userStatus, updateUserStatus } = useContext(UserContext)
  updateUserStatus("FREE")
  return (
    <div>{ userStatus }</div>
  )
}


it("updateUserPayment calls updateUserById", async () => {
  const { getAllByText } = render(<UserContextProvider pageProps={mockedPageProps}><TestComponent /></UserContextProvider>)
  expect(auth0.updateUserById).toHaveBeenCalledWith("", undefined, { "user_metadata": { "userStatus": "FREE" } })
  await waitFor(() => expect(getAllByText("FREE").length).toBe(1))
});
