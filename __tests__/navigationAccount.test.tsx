import React from "react"
import { render } from "@testing-library/react"
import { NavigationAccount, dataTestIds } from "../components/navigationAccount"
import { useThemeUI } from "theme-ui"

const mockUseThemeUI = jest.fn()
jest.mock("theme-ui", () => ({
  useThemeUI: () => mockUseThemeUI()
}));

beforeEach(() => {
  mockUseThemeUI.mockImplementation(() => ({
    theme: {
      colors: {
        grey200: "#ccc"
      }
    }
  }))
})

afterEach(() => {
  mockUseThemeUI.mockClear()
})

it("renders NavigationAccount component", () => {
  const { queryByTestId } = render(<NavigationAccount />)
  expect(queryByTestId(dataTestIds.container)).toBeInTheDocument()
})
