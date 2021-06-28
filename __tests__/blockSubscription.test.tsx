import React from "react"
import mockSubscriptionActive from "./_mockSubscriptionState"
import { act, fireEvent, render } from "@testing-library/react"
import { useDispatch } from "react-redux"
import { useStateSelector } from "../utils/useStateSelector"
import { activateSubscription, cancelSubscription, getSubscription } from "../state/slices/subscription"
import { showPopup } from "../state/slices/popups"
import { BlockSubscription } from "../components/blockSubscription"
import { dataTestIds } from "../components/blockSubscription"

const mockDispatch = jest.fn();
const mockUseStateSelector = jest.fn(() => {})
const mockGetSubscription = jest.fn((attr) => attr)
const mockCancelSubscription = jest.fn((attr) => attr)
const mockActivateSubscription = jest.fn((attr) => attr)
const mockShowPopup = jest.fn((attr) => attr)

jest.mock('react-redux', () => ({
  useDispatch: () => () => mockDispatch()
}));

jest.mock('../utils/useStateSelector', () => ({
  useStateSelector: () => mockUseStateSelector()
}));

jest.mock('../state/slices/subscription', () => ({
  activateSubscription: (attr) => mockActivateSubscription(attr),
  cancelSubscription: (attr) => mockCancelSubscription(attr),
  getSubscription: (attr) => mockGetSubscription(attr),
}));

jest.mock('../state/slices/popups', () => ({
  showPopup: (attr) => mockShowPopup(attr)
}));

beforeEach(() => {
  mockDispatch.mockImplementation(() => { })
  mockUseStateSelector.mockImplementation(() => ({
    subscription: {...mockSubscriptionActive}
  }));
  mockCancelSubscription.mockImplementation((attr) => attr)
  mockGetSubscription.mockImplementation((attr) => attr)
  mockShowPopup.mockImplementation((attr) => attr)
})

afterEach(() => {
  mockUseStateSelector.mockClear()
  mockDispatch.mockClear()
  mockGetSubscription.mockClear()
  mockCancelSubscription.mockClear()
  mockActivateSubscription.mockClear()
  mockShowPopup.mockClear()
})

it("dispatches getSubscription when component is mounted", () => {
  render(<BlockSubscription customerId="1" />)

  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockGetSubscription).toBeCalledTimes(1)
  expect(mockGetSubscription).toBeCalledWith("1")

})

it("displays free text when subscription status is not set", () => {
  mockUseStateSelector.mockImplementation(() => ({
    subscription: {}
  }));

  const { getByText } = render(<BlockSubscription customerId="1" />)
  expect(getByText('ScrambledData Free')).toBeInTheDocument()
})

it("displays premium text when a subscription status is set", () => {
  const { getByText } = render(<BlockSubscription customerId="1" />)
  const premiumText = `ScrambledData Premium - ${mockSubscriptionActive?.currencySymbol}${mockSubscriptionActive?.price} / ${mockSubscriptionActive?.period}`
  expect(getByText(premiumText)).toBeInTheDocument()
})


it("displays next invoice date when subscription status is active", () => {
  const { getByText } = render(<BlockSubscription customerId="1" />)
  const nextInvoice = `Next invoice date: ${mockSubscriptionActive?.invoiceDate}`
  expect(getByText(nextInvoice)).toBeInTheDocument()

})

it("displays end of trial date when subscription status is trialing", () => {
  mockUseStateSelector.mockImplementation(() => ({
    subscription: {
      ...mockSubscriptionActive,
      status: "trialing"
    }
  }));

  const { getByText } = render(<BlockSubscription customerId="1" />)
  const trialEnd = `Trial ends at: ${mockSubscriptionActive?.trialEnd}`
  expect(getByText(trialEnd)).toBeInTheDocument()
})

it("renders cancel button when subscription status is set and is not canceled", () => {
  const { queryByTestId } = render(<BlockSubscription customerId="1" />)
  expect(queryByTestId(dataTestIds.cancelButton)).toBeInTheDocument()
})

it("dispatches cancelSubscription when cancel button is clicked", () => {
  const { queryByTestId } = render(<BlockSubscription customerId="1" />)
  const cancelButton = queryByTestId(dataTestIds.cancelButton)

  act(() => {
    fireEvent.click(cancelButton)
  })

  expect(mockDispatch).toBeCalledTimes(2)
  expect(mockCancelSubscription).toBeCalledTimes(1)
  expect(mockCancelSubscription).toBeCalledWith(mockSubscriptionActive.id)
})


it("renders upgrade button when subscription status is not set", () => {
  mockUseStateSelector.mockImplementation(() => ({
    subscription: {
      ...mockSubscriptionActive,
      status: null
    }
  }));

  const { queryByTestId } = render(<BlockSubscription customerId="1" />)
  expect(queryByTestId(dataTestIds.activateButton).textContent).toBe("Upgrade")
})

it("dispatches showPopup setup when upgrade button is clicked", () => {
  mockUseStateSelector.mockImplementation(() => ({
    subscription: {
      ...mockSubscriptionActive,
      status: null
    }
  }));
  const { queryByTestId } = render(<BlockSubscription customerId="1" />)
  const upgradeButton = queryByTestId(dataTestIds.activateButton)

  act(() => {
    fireEvent.click(upgradeButton)
  })

  expect(mockDispatch).toBeCalledTimes(2)
  expect(mockShowPopup).toBeCalledTimes(1)
  expect(mockShowPopup).toBeCalledWith({ "popup": "setup" })
})


it("renders activate button when subscription status is canceled", () => {
  mockUseStateSelector.mockImplementation(() => ({
    subscription: {
      ...mockSubscriptionActive,
      status: "canceled"
    }
  }));

  const { queryByTestId } = render(<BlockSubscription customerId="1" />)
  expect(queryByTestId(dataTestIds.activateButton).textContent).toBe("Activate")
})

it("dispatches activateSubscription when active button is clicked and hasCard is true", () => {
  mockUseStateSelector.mockImplementation(() => ({
    subscription: {
      ...mockSubscriptionActive,
      status: "canceled"
    },
    hasCard: true,
  }));
  const { queryByTestId } = render(<BlockSubscription customerId="1" />)
  const upgradeButton = queryByTestId(dataTestIds.activateButton)

  act(() => {
    fireEvent.click(upgradeButton)
  })

  expect(mockDispatch).toBeCalledTimes(2)
  expect(mockActivateSubscription).toBeCalledTimes(1)
})

it("dispatches showPopup upgrade when active button is clicked and hasCard is false", () => {
  mockUseStateSelector.mockImplementation(() => ({
    subscription: {
      ...mockSubscriptionActive,
      status: "canceled"
    },
    hasCard: false,
  }));
  const { queryByTestId } = render(<BlockSubscription customerId="1" />)
  const upgradeButton = queryByTestId(dataTestIds.activateButton)

  act(() => {
    fireEvent.click(upgradeButton)
  })

  expect(mockDispatch).toBeCalledTimes(2)
  expect(mockShowPopup).toBeCalledTimes(1)
  expect(mockShowPopup).toBeCalledWith({popup: "upgrade"})
})
