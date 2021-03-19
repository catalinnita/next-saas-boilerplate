import React from "react"
import { render, fireEvent, act } from "@testing-library/react"
import { PopupsWrapper, dataTestIds } from "../components/popupsWrapper"
import { dataTestIds as freePremiumPopupDataTestIds } from "../components/freePremiumPopup"
import appConfig from "../config/appConfig"

jest.mock("../config/appConfig", () => ({}))

const mockUpdateUserStatus = jest.fn().mockImplementation((userStatus) => userStatus)
const mockUseContext = jest.fn().mockImplementation(() => ({
  userPayment: null,
  userStatus: "NEW",
  updateUserStatus: mockUpdateUserStatus,
}));

React.useContext = mockUseContext;


beforeEach(() => {
  appConfig.acceptFree = true
})

it("renders the popups wrapper component", () => {
  const { getByTestId } = render(<PopupsWrapper />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})

// freePremium popup logic
it("shows freePremium popup when it userStatus is NEW and appConfig.acceptFree is true", () => {
  const { queryByTestId } = render(<PopupsWrapper />)
  expect(queryByTestId(dataTestIds.freePremiumPopup)).toBeInTheDocument()
})

it("doesn't show freePremium popup when userStatus is NEW appConfig.acceptFree is false", () => {
  appConfig.acceptFree = false
  const { queryByTestId } = render(<PopupsWrapper />)
  expect(queryByTestId(dataTestIds.freePremiumPopup)).not.toBeInTheDocument()
})

it("doesn't show freePremium popup when userStatus is FREE", () => {
  mockUseContext.mockImplementation(() => ({
    userStatus: "FREE"
  }))
  const { queryByTestId } = render(<PopupsWrapper />)
  expect(queryByTestId(dataTestIds.freePremiumPopup)).not.toBeInTheDocument()
})

it("doesn't show freePremium popup when userStatus is PREMIUM", () => {
  mockUseContext.mockImplementation(() => ({
    userStatus: "PREMIUM"
  }))
  const { queryByTestId } = render(<PopupsWrapper />)
  expect(queryByTestId(dataTestIds.freePremiumPopup)).not.toBeInTheDocument()
})

// paymentMethod popup logic

it("shows paymentMethod popup when userStatus is NEW and appConfig.acceptFree is false", () => {
  mockUseContext.mockImplementation(() => ({
    userStatus: "NEW"
  }))
  appConfig.acceptFree = false
  const { queryByTestId } = render(<PopupsWrapper />)
  expect(queryByTestId(dataTestIds.paymentMethodPopup)).toBeInTheDocument()
})

it("shows paymentMethod popup when userStatus is PREMIUM and paymentMethod is not set", () => {
  mockUseContext.mockImplementation(() => ({
    userPayment: null,
    userStatus: "PREMIUM"
  }))
  const { queryByTestId } = render(<PopupsWrapper />)
  expect(queryByTestId(dataTestIds.paymentMethodPopup)).toBeInTheDocument()
})

it("doesn't display paymentMethod popup when userStatus is PREMIUM and userPayment is set", () => {
  mockUseContext.mockImplementation(() => ({
    userPayment: {},
    userStatus: "PREMIUM"
  }))
  const { queryByTestId } = render(<PopupsWrapper />)
  expect(queryByTestId(dataTestIds.paymentMethodPopup)).not.toBeInTheDocument()
})

it("doesn't display paymentMethod popup when userStatus is not PREMIUM", () => {
  mockUseContext.mockImplementation(() => ({
    userStatus: "FREE"
  }))
  const { queryByTestId } = render(<PopupsWrapper />)
  expect(queryByTestId(dataTestIds.paymentMethodPopup)).not.toBeInTheDocument()
})

// children logic

it("shows the children when userStatus is FREE", () => {
  mockUseContext.mockImplementation(() => ({
    userStatus: "FREE"
  }))
  const { queryAllByText } = render(<PopupsWrapper><div>TestChildren</div></PopupsWrapper>)
  expect(queryAllByText("TestChildren").length).toBe(1)
})

it("shows the children when userStatus is PREMIUM and userPayment is set", () => {
  mockUseContext.mockImplementation(() => ({
    userPayment: {},
    userStatus: "PREMIUM"
  }))
  const { queryAllByText } = render(<PopupsWrapper><div>TestChildren</div></PopupsWrapper>)
  expect(queryAllByText("TestChildren").length).toBe(1)
})

it("doesn't show the children when userStatus is NEW", () => {
  mockUseContext.mockImplementation(() => ({
    userStatus: "NEW"
  }))
  const { queryAllByText } = render(<PopupsWrapper><div>TestChildren</div></PopupsWrapper>)
  expect(queryAllByText("TestChildren").length).toBe(0)
})

// setFree and setPremium

it("calls set userStatus auth0 user_metadata value and updateUserStatus with argument FREE when setFree is called", () => {
  mockUseContext.mockImplementation(() => ({
    userStatus: "NEW",
    updateUserStatus: mockUpdateUserStatus,
  }))
  const result = render(<PopupsWrapper><div>TestChildren</div></PopupsWrapper>)
  act(() => {
    fireEvent.click(result.getByTestId(freePremiumPopupDataTestIds.freeButton))
  })

  expect(mockUpdateUserStatus).toHaveBeenCalledWith("FREE")
})

it("calls set userStatus cookie value and setUserStatus with argument PREMIUM when setPremium is called", () => {
  const { getByTestId } = render(<PopupsWrapper><div>TestChildren</div></PopupsWrapper>)
  act(() => {
    fireEvent.click(getByTestId(freePremiumPopupDataTestIds.premiumButton))
  })
  expect(mockUpdateUserStatus).toHaveBeenCalledWith("PREMIUM")
})
