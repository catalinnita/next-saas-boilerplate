import React from "react"
import { render } from "@testing-library/react"
import { NavigationSidebar, dataTestIds } from "../components/navigationSidebar"


it("renders NavigationSidebar component", () => {
  const { queryByTestId } = render(<NavigationSidebar />)
  expect(queryByTestId(dataTestIds.container)).toBeInTheDocument()
})
