import React from "react"
import { render } from "@testing-library/react"
import { NavigationTop, dataTestIds } from "../components/navigationTop"


it("renders NavigationTop component", () => {
  const { queryByTestId } = render(<NavigationTop />)
  expect(queryByTestId(dataTestIds.container)).toBeInTheDocument()
})
