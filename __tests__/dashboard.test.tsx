import React from "react"
import { render } from "@testing-library/react"
import Page, { dataTestIds } from "../pages/dashboard"

it("should render the Page", async () => {
  const { getByTestId } = render(<Page />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})
