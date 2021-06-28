import React from "react"
import { render } from "@testing-library/react"
import Page, { dataTestIds } from "../pages"

it("renders the index page", () => {
  const { queryByTestId } = render(<Page />)
  expect(queryByTestId(dataTestIds.container)).toBeInTheDocument()
})
