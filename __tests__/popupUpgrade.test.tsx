import React from "react"
import { act, fireEvent, render } from "@testing-library/react";
import { PopupUpgrade } from "../components/popupUpgrade";
import { useDispatch } from "react-redux"
import { attachCard } from "../state/slices/cards"
import { activateSubscription } from "../state/slices/subscription"
import { closeAllPopups } from "../state/slices/popups"
import { FormCreditCard } from "../components/formCreditCard"

const mockDispatch = jest.fn();
const mockCloseAllPopups = jest.fn();
const mockAttachCard = jest.fn((attr) => attr);
const mockActivateSubscription = jest.fn((attr) => attr);

function MockFormCreditCard({
  buttonText = "Submit",
  onSubmitCallback
}) {
  return (
    <button data-testid="mockedButton" onClick={() => { onSubmitCallback({}) }}></button>
  )
}

jest.mock("../components/formCreditCard", () => ({
  ...jest.requireActual('../components/formCreditCard'),
  FormCreditCard: MockFormCreditCard
}))
jest.mock('react-redux', () => ({
  useDispatch: () => () => mockDispatch()
}));
jest.mock("../state/slices/popups", () => ({
  closeAllPopups: () => mockCloseAllPopups()
}));
jest.mock("../state/slices/cards", () => ({
  attachCard: (attr) => mockAttachCard(attr)
}));
jest.mock("../state/slices/subscription", () => ({
  activateSubscription: (attr) => mockActivateSubscription(attr)
}));

beforeEach(() => {
  mockDispatch.mockImplementation(() => { })
  mockCloseAllPopups.mockImplementation(() => { })
  mockAttachCard.mockImplementation((attr) => attr)
  mockActivateSubscription.mockImplementation((attr) => attr)
})
afterEach(() => {
  mockDispatch.mockClear()
  mockCloseAllPopups.mockClear()
  mockAttachCard.mockClear()
  mockActivateSubscription.mockClear()
})

it("dispatches attachCard and activateSubscription on submit", () => {
  const { queryByTestId } = render(<PopupUpgrade />)
  const creditCardFormButton = queryByTestId("mockedButton")
  act(() => {
    fireEvent.click(creditCardFormButton)
  })

  expect(mockDispatch).toBeCalledTimes(2)
  expect(mockAttachCard).toBeCalledTimes(1)
  expect(mockActivateSubscription).toBeCalledTimes(1)
})
