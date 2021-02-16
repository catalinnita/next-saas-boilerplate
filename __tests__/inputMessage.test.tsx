import React from "react"
import { render } from "@testing-library/react"
import { InputMessage, dataTestIds, Error } from "../components/inputMessage"

const errorProps: Error = {
  valid: false,
  message: "Error message"
}

const successProps: Error = {
  valid: true,
  message: "Success message"
}

it("should NOT render the InputMessage component if props are not set", async () => {
  const { queryByTestId } = render(<InputMessage />)
  expect(queryByTestId(dataTestIds.container)).toBeNull()
})

it("should render the InputMessage component if props are set", async () => {
  const { getByTestId } = render(<InputMessage {...errorProps} />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it("should render the InputMessage error message if error props are set", async () => {
  const { getByTestId } = render(<InputMessage {...errorProps} />)
  expect(getByTestId(dataTestIds.errorText).innerHTML).toBe(errorProps.message)
})

it("should render the InputMessage success message if success props are set", async () => {
  const { getByTestId } = render(<InputMessage {...successProps} />)
  expect(getByTestId(dataTestIds.successText).innerHTML).toBe(successProps.message)
})

it("should render the InputMessage message with error icon if valid prop is false", async () => {
  const { getByTestId } = render(<InputMessage {...errorProps} />)
  expect(getByTestId(dataTestIds.errorIcon)).toBeInTheDocument()
})

it("should render the InputMessage message with success icon if valid prop is true", async () => {
  const { getByTestId } = render(<InputMessage {...successProps} />)
  expect(getByTestId(dataTestIds.successIcon)).toBeInTheDocument()
})

