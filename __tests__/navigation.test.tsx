import React from "react"
import { render } from "@testing-library/react"
import { Header, dataTestIds } from "../components/header"

it("should render the Navigation component", async () => {
  const { getByTestId } = render(<Header />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})
