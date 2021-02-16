import React from "react"
import { render } from "@testing-library/react"
import { Navigation, dataTestIds } from "../components/navigation"

it("should render the Navigation component", async () => {
  const { getByTestId } = render(<Navigation />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})
