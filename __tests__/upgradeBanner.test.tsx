import React from "react"
import { fireEvent, render } from "@testing-library/react"
import { UpgradeBanner, dataTestIds } from "../components/upgradeBanner"

const mockUseContext = jest.fn().mockImplementation(() => ({
  hadTrial: true,
}));

React.useContext = mockUseContext;

it("renders the upgrade banner component", () => {
  const { getByTestId } = render(<UpgradeBanner />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it("shows upgrade text if the user previously had a trial", () => {
  const { getByText } = render(<UpgradeBanner />)
  expect(getByText("Upgrade to premium")).toBeInTheDocument()
})

it("shows trial text if it had no trial before", () => {
  mockUseContext.mockImplementation(() => ({
    hadTrial: false,
  }))

  const { getByText } = render(<UpgradeBanner />)
  expect(getByText("Start premium trial")).toBeInTheDocument()

})

it("upgrade button fires the callback with paymentMethod as argument", () => {
  const mockCallback = jest.fn()
  const { getByTestId } = render(<UpgradeBanner openPopup={mockCallback} />)
  fireEvent.click(getByTestId(dataTestIds.button))
  expect(mockCallback).toHaveBeenCalledWith("paymentMethod")
})
