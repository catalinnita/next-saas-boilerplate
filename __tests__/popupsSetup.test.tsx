import React from "react"
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { useDispatch } from "react-redux"
import { setCookie, parseCookies } from "nookies"
import { PopupSetup, dataTestIds } from "../components/popupSetup";
import { attachCard } from "../state/slices/cards"
import { createSubscription } from "../state/slices/subscription"
import { closeAllPopups } from "../state/slices/popups"
import { FormCreditCard } from "../components/formCreditCard"
import { useStateSelector } from "../utils/useStateSelector"
import { createCustomer } from "../state/slices/customer"

const mockDispatch = jest.fn();
const mockCloseAllPopups = jest.fn();
const mockAttachCard = jest.fn((attr) => attr);
const mockCreateSubscription = jest.fn((attr) => attr);
const mockCreateCustomer = jest.fn((attr) => attr);
const mockUseStateSelector = jest.fn(() => { });
const mockSetCookie = jest.fn((attr1, attr2, attr3) => ({}));
const mockParseCookies = jest.fn(() => {});

function MockFormCreditCard({
  buttonText = "Submit",
  onSubmitCallback
}) {
  return (
    <button data-testid="mockedButton" onClick={() => { onSubmitCallback({}) }} />
  )
}

jest.mock("../components/formCreditCard", () => ({
  ...jest.requireActual("../components/formCreditCard"),
  FormCreditCard: MockFormCreditCard
}))
jest.mock("react-redux", () => ({
  useDispatch: () => () => mockDispatch()
}));
jest.mock("../state/slices/popups", () => ({
  closeAllPopups: () => mockCloseAllPopups()
}));
jest.mock("nookies", () => ({
  ...jest.requireActual("nookies"),
  setCookie: (attr1, attr2, attr3) => mockSetCookie(attr1, attr2, attr3),
  parseCookies: () => mockParseCookies()
}));
jest.mock("../state/slices/cards", () => ({
  attachCard: (attr) => mockAttachCard(attr)
}));
jest.mock("../state/slices/subscription", () => ({
  createSubscription: (attr) => mockCreateSubscription(attr)
}));
jest.mock("../state/slices/customer", () => ({
  createCustomer: (attr) => mockCreateCustomer(attr)
}));
jest.mock("../utils/useStateSelector", () => ({
  useStateSelector: () => mockUseStateSelector()
}));

beforeEach(() => {
  mockDispatch.mockImplementation(() => Promise.resolve().then(() => Promise.resolve()))
  mockCloseAllPopups.mockImplementation(() => { })
  mockAttachCard.mockImplementation((attr) => attr)
  mockCreateSubscription.mockImplementation((attr) => attr)
  mockCreateCustomer.mockImplementation((attr) => attr)
  mockUseStateSelector.mockImplementation(() => ({}))
  mockSetCookie.mockImplementation((attr1, attr2, attr3) => ({}))
  mockParseCookies.mockImplementation(() => ({}))
})
afterEach(() => {
  mockDispatch.mockClear()
  mockCloseAllPopups.mockClear()
  mockAttachCard.mockClear()
  mockCreateSubscription.mockClear()
  mockCreateCustomer.mockClear()
  mockUseStateSelector.mockClear()
  mockSetCookie.mockClear()
  mockParseCookies.mockClear()
})

it("shows the skip link if showSkipLink is true", () => {
  const { queryByTestId } = render(<PopupSetup showSkipLink />)
  expect(queryByTestId(dataTestIds.skipLink)).toBeInTheDocument()
})

it("doesn't show the skip link if showSkipLink is false", () => {
  const { queryByTestId } = render(<PopupSetup showSkipLink={false} />)
  expect(queryByTestId(dataTestIds.skipLink)).not.toBeInTheDocument()
})

it("sets the setupPopupDisplayed cookie when skip link is clicked", () => {
  const { queryByTestId } = render(<PopupSetup showSkipLink />)
  const skipLink = queryByTestId(dataTestIds.skipLink)

  act(() => {
    fireEvent.click(skipLink)
  })

  expect(mockSetCookie).toBeCalledTimes(1)
  expect(mockSetCookie).toHaveBeenCalledWith(null, "setupPopupDisplayed", "1")
})

it("doesn't set the setupPopupDisplayed cookie if it's already set", () => {
  mockParseCookies.mockImplementation(() => ({
    setupPopupDisplayed: "1"
  }))

  const { queryByTestId } = render(<PopupSetup showSkipLink />)
  const skipLink = queryByTestId(dataTestIds.skipLink)

  act(() => {
    fireEvent.click(skipLink)
  })

  expect(mockSetCookie).toBeCalledTimes(0)
})

it("dispatches attachCard and createSubscription on submit", async () => {
  const { queryByTestId } = render(<PopupSetup />)
  const creditCardFormButton = queryByTestId("mockedButton")
  act(() => {
    fireEvent.click(creditCardFormButton)
  })

  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockCreateCustomer).toBeCalledTimes(1)
  await waitFor(() => expect(mockAttachCard).toBeCalledTimes(1))
  await waitFor(() => expect(mockCreateSubscription).toBeCalledTimes(1))
})
