import React from "react"
import Cookies from "js-cookie"
import { render, fireEvent } from "@testing-library/react"
import { PopupsWrapper, dataTestIds } from "../components/popupsWrapper"
import { dataTestIds as freePremiumPopupDataTestIds } from "../components/freePremiumPopup"
import appConfig from "../config/appConfig"


jest.mock("../config/appConfig", () => ({}))
jest.mock("js-cookie", () => ({
  set: jest.fn()
}))

beforeEach(() => {
  appConfig.acceptFree = true
})

it("renders the popups wrapper component", () => {
  const { getByTestId } = render(<PopupsWrapper />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})

// freePremium popup logic
it("shows freePremium popup when it userStatus is not defined and appConfig.acceptFree is true", () => {
  const { queryByTestId } = render(<PopupsWrapper />)
  expect(queryByTestId(dataTestIds.freePremiumPopup)).toBeInTheDocument()
})

it("doesn't show freePremium popup when userStatus is not set appConfig.acceptFree is false", () => {
  appConfig.acceptFree = false
  const { queryByTestId } = render(<PopupsWrapper />)
  expect(queryByTestId(dataTestIds.freePremiumPopup)).not.toBeInTheDocument()
})


it("doesn't show freePremium popup when userStatus is FREE", () => {
  const { queryByTestId } = render(<PopupsWrapper userStatus="FREE" />)
  expect(queryByTestId(dataTestIds.freePremiumPopup)).not.toBeInTheDocument()
})

it("doesn't show freePremium popup when userStatus is PREMIUM", () => {
  const { queryByTestId } = render(<PopupsWrapper userStatus="PREMIUM" />)
  expect(queryByTestId(dataTestIds.freePremiumPopup)).not.toBeInTheDocument()
})

// paymentMethod popup logic

it("shows paymentMethod popup when userStatus is not set and appConfig.acceptFree is false", () => {
  appConfig.acceptFree = false
  const { queryByTestId } = render(<PopupsWrapper />)
  expect(queryByTestId(dataTestIds.paymentMethodPopup)).toBeInTheDocument()
})

it("shows paymentMethod popup when userStatus is PREMIUM and paymentMethod is not set", () => {
  const { queryByTestId } = render(<PopupsWrapper userStatus="PREMIUM" />)
  expect(queryByTestId(dataTestIds.paymentMethodPopup)).toBeInTheDocument()
})

it("doesn't display paymentMethod popup when userStatus is PREMIUM and userPayment is set", () => {
  const { queryByTestId } = render(<PopupsWrapper userStatus="PREMIUM" userPayment="sourceId" />)
  expect(queryByTestId(dataTestIds.paymentMethodPopup)).not.toBeInTheDocument()
})

it("doesn't display paymentMethod popup when userStatus is not PREMIUM", () => {
  const { queryByTestId } = render(<PopupsWrapper userStatus="FREE" />)
  expect(queryByTestId(dataTestIds.paymentMethodPopup)).not.toBeInTheDocument()
})

// children logic

it("shows the children when userStatus is FREE", () => {
  const { queryAllByText } = render(<PopupsWrapper userStatus="FREE"><div>TestChildren</div></PopupsWrapper>)
  expect(queryAllByText("TestChildren").length).toBe(1)
})

it("shows the children when userStatus is PREMIUM and userPayment is set", () => {
  const { queryAllByText } = render(<PopupsWrapper userStatus="PREMIUM" userPayment="sourceId"><div>TestChildren</div></PopupsWrapper>)
  expect(queryAllByText("TestChildren").length).toBe(1)
})

it("doesn't show the children when userStatus is not set", () => {
  const { queryAllByText } = render(<PopupsWrapper><div>TestChildren</div></PopupsWrapper>)
  expect(queryAllByText("TestChildren").length).toBe(0)
})

// setFree and setPremium

it("calls set userStatus cookie value and setUserStatus with argument FREE when setFree is called", () => {
  const setUserStatus = jest.fn()
  const { getByTestId } = render(<PopupsWrapper setUserStatus={setUserStatus} />)
  fireEvent.click(getByTestId(freePremiumPopupDataTestIds.freeButton))
  expect(setUserStatus).toHaveBeenCalledWith("FREE")
  expect(Cookies.set).toHaveBeenCalledWith("userStatus", "FREE", {"expires": 30})
})

it("calls set userStatus cookie value and setUserStatus with argument PREMIUM when setPremium is called", () => {
  const setUserStatus = jest.fn()
  const { getByTestId } = render(<PopupsWrapper setUserStatus={setUserStatus} />)
  fireEvent.click(getByTestId(freePremiumPopupDataTestIds.premiumButton))
  expect(setUserStatus).toHaveBeenCalledWith("PREMIUM")
  expect(Cookies.set).toHaveBeenCalledWith("userStatus", "PREMIUM", {"expires": 30})
})
