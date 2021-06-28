import React from "react"
import mockCards from "./_mockCards"
import { act, fireEvent, render } from "@testing-library/react"
import { RowCard, dataTestIds } from "../components/rowCard"
import { useDispatch } from "react-redux"
import { useStateSelector } from "../utils/useStateSelector"
import { updateDefaultCard } from "../state/slices/customer"
import { removeCard } from "../state/slices/cards"
import Stripe from "stripe"

const mockDispatch = jest.fn();
const mockUseStateSelector = jest.fn(() => {})
const mockUpdateDefaultCard = jest.fn((attr) => attr)
const mockRemoveCard = jest.fn((attr) => attr)

jest.mock('react-redux', () => ({
  useDispatch: () => () => mockDispatch()
}));

jest.mock('../utils/useStateSelector', () => ({
  useStateSelector: () => mockUseStateSelector()
}));

jest.mock('../state/slices/customer', () => ({
  updateDefaultCard: (attr) => mockUpdateDefaultCard(attr)
}));

jest.mock('../state/slices/cards', () => ({
  removeCard: (attr) => mockRemoveCard(attr)
}));

beforeEach(() => {
  mockDispatch.mockImplementation(() => {})
  mockUseStateSelector.mockImplementation(() => ({
    id: "1",
    defaultCardId: "card_1IXUKjA8b46monEK0mD6CnJc"
  }))
})

afterEach(() => {
  mockDispatch.mockClear()
  mockUseStateSelector.mockClear()
  mockUpdateDefaultCard.mockClear()
  mockRemoveCard.mockClear()
})

it("sets the default card radio as checked", () => {
  const { getByTestId } = render(<RowCard card={mockCards[0] as Stripe.Card} />)
  const radioButton = getByTestId(dataTestIds.defaultCardRadio) as HTMLInputElement
  expect(radioButton.checked).toBe(true)
})

it("dispatches updateDefaultCard when radio button is clicked", () => {
  mockUpdateDefaultCard.mockImplementation((attr) => attr)
  const { queryByTestId } = render(<RowCard card={mockCards[1] as Stripe.Card} />)
  const radioButton = queryByTestId(dataTestIds.defaultCardRadio)

  act(() => {
    fireEvent.click(radioButton)
  })

  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockUpdateDefaultCard).toBeCalledTimes(1)
  expect(mockUpdateDefaultCard).toBeCalledWith({customerId: "1", sourceId: "card_1IXUKjA8b46monEK0mD6CnJb"})
})

it("dispatches removeCard when remove button is clicked", () => {
  mockRemoveCard.mockImplementation((attr) => attr)
  const { queryByTestId } = render(<RowCard card={mockCards[0] as Stripe.Card} />)
  const removeButton = queryByTestId(dataTestIds.removeCardButton)

  act(() => {
    fireEvent.click(removeButton)
  })

  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockRemoveCard).toBeCalledTimes(1)
  expect(mockRemoveCard).toBeCalledWith({customerId: "1", sourceId: "card_1IXUKjA8b46monEK0mD6CnJc"})
})
