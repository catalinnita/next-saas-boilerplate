import React from "react"
import mockCards from "./_mockCards"
import { act, fireEvent, render } from "@testing-library/react"
import { BlockCards, dataTestIds } from "../components/blockCards"
import { useDispatch } from "react-redux"
import { useStateSelector } from "../utils/useStateSelector"
import { getCards } from "../state/slices/cards"
import { showPopup } from "../state/slices/popups"
import { orderObjectById } from "../utils/orderObjectById"

const mockDispatch = jest.fn();
const mockUseStateSelector = jest.fn(() => {})
const mockGetCards = jest.fn((attr) => attr)
const mockShowPopup = jest.fn((attr) => attr)
const mockOrderObjectById = jest.fn((attr) => attr)

jest.mock('react-redux', () => ({
  useDispatch: () => () => mockDispatch()
}));

jest.mock('../utils/useStateSelector', () => ({
  useStateSelector: () => mockUseStateSelector()
}));

jest.mock('../state/slices/cards', () => ({
  getCards: (attr) => mockGetCards(attr)
}));

jest.mock('../state/slices/popups', () => ({
  showPopup: (attr) => mockShowPopup(attr)
}));

jest.mock('../utils/orderObjectById', () => ({
  orderObjectById: (attr) => mockOrderObjectById(attr)
}))

afterEach(() => {
  mockUseStateSelector.mockClear()
  mockDispatch.mockClear()
  mockGetCards.mockClear()
  mockShowPopup.mockClear()
  mockOrderObjectById.mockClear()
})

it("doesn't render block component if cardsList is empty", () => {
  mockDispatch.mockImplementation(() => {})
  mockUseStateSelector.mockImplementation(() => ({
    cardsList: []
  }));

  const { queryByTestId } = render(<BlockCards customerId="1" />)
  expect(queryByTestId("block-container")).not.toBeInTheDocument()
})

it("displays add card button if it has less than 5 cards", () => {
  mockDispatch.mockImplementation(() => {})
  mockUseStateSelector.mockImplementation(() => ({
    cardsList: [
      ...mockCards.slice(0, 2)
    ]
  }));

  const { queryByTestId } = render(<BlockCards customerId="1" />)
  expect(queryByTestId(dataTestIds.addCardButton)).toBeInTheDocument()
})

it("doesn't display add card button if it has 5 cards", () => {
  mockDispatch.mockImplementation(() => {})
  mockUseStateSelector.mockImplementation(() => ({
    cardsList: [
      ...mockCards
    ]
  }));

  const { queryByTestId } = render(<BlockCards customerId="1" />)
  expect(queryByTestId(dataTestIds.addCardButton)).not.toBeInTheDocument()
})


it("renders one row for each card", () => {
  mockDispatch.mockImplementation(() => {})
  mockUseStateSelector.mockImplementation(() => ({
    cardsList: [
      ...mockCards
    ]
  }));

  const { queryAllByTestId } = render(<BlockCards customerId="1" />)
  const cardRows = queryAllByTestId("card-row")
  expect(cardRows.length).toBe(5)
})

it("orders the cardsList before rendering", () => {
  mockDispatch.mockImplementation(() => {})
  mockUseStateSelector.mockImplementation(() => ({
    cardsList: [
      ...mockCards
    ]
  }));
  mockOrderObjectById.mockImplementation((attr) => attr)

  render(<BlockCards customerId="1" />)

  expect(mockOrderObjectById).toBeCalledTimes(1)
  expect(mockOrderObjectById).toBeCalledWith([...mockCards])
})

it("dispatches getcards when the component renders", () => {
  mockDispatch.mockImplementation(() => {})
  mockGetCards.mockImplementation((attr) => attr)
  mockUseStateSelector.mockImplementation(() => ({
    cardsList: [
      ...mockCards
    ]
  }));

  render(<BlockCards customerId="1" />)
  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockGetCards).toBeCalledTimes(1)
  expect(mockGetCards).toBeCalledWith({ customerId: "1" })
})


it("dispatches showPopup when add card button is clicked", () => {
  mockDispatch.mockImplementation(() => {})
  mockShowPopup.mockImplementation((attr) => attr)
  mockUseStateSelector.mockImplementation(() => ({
    cardsList: [
      ...mockCards.slice(0,2)
    ]
  }));

  const { getByTestId } = render(<BlockCards customerId="1" />)
  const addCardButton = getByTestId(dataTestIds.addCardButton)

  act(() => {
    fireEvent.click(addCardButton)
  })

  expect(mockDispatch).toBeCalledTimes(2)
  expect(mockShowPopup).toBeCalledTimes(1)
  expect(mockShowPopup).toBeCalledWith({ popup: "paymentMethod" })

})
