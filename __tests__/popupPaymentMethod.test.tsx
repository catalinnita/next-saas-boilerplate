import React from "react"
import { act, fireEvent, render } from "@testing-library/react";
import { useDispatch } from "react-redux"
import { PopupAddPaymentMethod } from "../components/popupAddPaymentMethod";
import { attachCard } from "../state/slices/cards"
import { closeAllPopups } from "../state/slices/popups"
import { FormCreditCard } from "../components/formCreditCard"

const mockDispatch = jest.fn();
const mockCloseAllPopups = jest.fn();
const mockAttachCard = jest.fn((attr) => attr);

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
jest.mock("../state/slices/cards", () => ({
  attachCard: (attr) => mockAttachCard(attr)
}));

beforeEach(() => {
  mockDispatch.mockImplementation(() => { })
  mockCloseAllPopups.mockImplementation(() => { })
  mockAttachCard.mockImplementation((attr) => attr)
})
afterEach(() => {
  mockDispatch.mockClear()
  mockCloseAllPopups.mockClear()
  mockAttachCard.mockClear()
})

it("dispatches attachCard and closeAllPopups on submit", () => {
  const { queryByTestId } = render(<PopupAddPaymentMethod />)
  const creditCardFormButton = queryByTestId("mockedButton")
  act(() => {
    fireEvent.click(creditCardFormButton)
  })

  expect(mockDispatch).toBeCalledTimes(2)
  expect(mockCloseAllPopups).toBeCalledTimes(1)
  expect(mockAttachCard).toBeCalledTimes(1)
})
