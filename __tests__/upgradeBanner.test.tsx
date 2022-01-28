import React from "react"
import { act, fireEvent, render } from "@testing-library/react";
import { useDispatch } from "react-redux"
import { UpgradeBanner, dataTestIds} from "../components/upgradeBanner";
import { useStateSelector } from "../utils/useStateSelector"
import { showPopup } from "../state/slices/popups"
import { activateSubscription, getSubscription } from "../state/slices/subscription"

const mockDispatch = jest.fn();
const mockUseStateSelector = jest.fn(() => { });
const mockShowPopup = jest.fn((attr) => attr);
const mockActivateSubscription = jest.fn((attr) => attr);
const mockGetSubscription = jest.fn((attr) => attr);


jest.mock("react-redux", () => ({
  useDispatch: () => () => mockDispatch()
}));

jest.mock("../utils/useStateSelector", () => ({
  useStateSelector: () => mockUseStateSelector()
}));

jest.mock("../state/slices/popups", () => ({
  showPopup: (attr) => mockShowPopup(attr)
}));

jest.mock("../state/slices/subscription", () => ({
  activateSubscription: (attr) => mockActivateSubscription(attr),
  getSubscription: (attr) => mockGetSubscription(attr),
}));

beforeEach(() => {
  mockDispatch.mockImplementation(() => { })
  mockUseStateSelector.mockImplementation(() => ({
    hasCard: false,
    status: null,
    popupToShow: null,
  }))
  mockShowPopup.mockImplementation((attr) => attr)
  mockActivateSubscription.mockImplementation((attr) => attr)
  mockGetSubscription.mockImplementation((attr) => attr)
})

afterEach(() => {
  mockDispatch.mockClear()
  mockUseStateSelector.mockClear()
  mockShowPopup.mockClear()
  mockActivateSubscription.mockClear()
  mockGetSubscription.mockClear()
})


it("doesn't show the banner if popupToShow is set", () => {
  mockUseStateSelector.mockImplementation(() => ({
    hasCard: false,
    status: null,
    popupToShow: "setup",
  }))
  const { queryByTestId } = render(<UpgradeBanner customerId="1" />)
  expect(queryByTestId(dataTestIds.container)).not.toBeInTheDocument()

})

it("doesn't show the banner if subscription is set and not canceled", () => {
  mockUseStateSelector.mockImplementation(() => ({
    hasCard: false,
    status: "active",
    popupToShow: "setup",
  }))
  const { queryByTestId } = render(<UpgradeBanner customerId="1" />)
  expect(queryByTestId(dataTestIds.container)).not.toBeInTheDocument()
})

it("dispatches getSubscription when the component is mounted and it has a customerId", () => {
  render(<UpgradeBanner customerId="1" />)
  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockGetSubscription).toBeCalledTimes(1)
})

it("dispatches showPopup when upgrade button is clicked and subscription is not set", () => {
  mockUseStateSelector.mockImplementation(() => ({
    hasCard: false,
    status: null,
    popupToShow: null,
  }))

  const { queryByTestId } = render(<UpgradeBanner customerId="1" />)
  const upgradeButton = queryByTestId(dataTestIds.button)

  act(() => {
    fireEvent.click(upgradeButton)
  })

  expect(mockDispatch).toBeCalledTimes(2)
  expect(mockShowPopup).toBeCalledTimes(1)
  expect(mockShowPopup).toBeCalledWith({ popup: "setup" })
})

it("dispatches showPopup when upgrade button is clicked subscription is set but no card is added", () => {
  mockUseStateSelector.mockImplementation(() => ({
    hasCard: false,
    status: "canceled",
    popupToShow: null,
  }))

  const { queryByTestId } = render(<UpgradeBanner customerId="1" />)
  const upgradeButton = queryByTestId(dataTestIds.button)

  act(() => {
    fireEvent.click(upgradeButton)
  })

  expect(mockDispatch).toBeCalledTimes(2)
  expect(mockShowPopup).toBeCalledTimes(1)
  expect(mockShowPopup).toBeCalledWith({ popup: "upgrade" })
})

it("dispatches activateSubscription when upgrade button is clicked and subscription is not set and at least a card was added", () => {
  mockUseStateSelector.mockImplementation(() => ({
    hasCard: true,
    status: "canceled",
    popupToShow: null,
  }))

  const { queryByTestId } = render(<UpgradeBanner customerId="1" />)
  const upgradeButton = queryByTestId(dataTestIds.button)

  act(() => {
    fireEvent.click(upgradeButton)
  })

  expect(mockDispatch).toBeCalledTimes(2)
  expect(mockActivateSubscription).toBeCalledTimes(1)
})
