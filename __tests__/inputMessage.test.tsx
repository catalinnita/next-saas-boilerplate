import React from "react"
import { render } from "@testing-library/react"
import { InputMessage, dataTestIds } from "../components/inputMessage"

it("renders the success message if valid is true ", () => {
  const { queryByTestId } = render(<InputMessage valid message="success message" />)
  expect(queryByTestId(dataTestIds.successText).textContent).toBe("success message")
})

it("renders the error message if valid is not true ", () => {
  const { queryByTestId } = render(<InputMessage valid={false} message="success message" />)
  expect(queryByTestId(dataTestIds.errorText).textContent).toBe("success message")
})

it("renders nothing if message is missing ", () => {
  const { queryByTestId } = render(<InputMessage valid={false} />)
  expect(queryByTestId(dataTestIds.container)).not.toBeInTheDocument()
})

