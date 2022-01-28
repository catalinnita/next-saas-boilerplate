import React from "react"
import { act, fireEvent, render } from "@testing-library/react"
import { useDispatch } from "react-redux"
import mockInvoices from "./_mockInvoices"
import { BlockInvoices, dataTestIds } from "../components/blockInvoices"
import { useStateSelector } from "../utils/useStateSelector"
import { getInvoices, loadMoreInvoices } from "../state/slices/invoices"

const mockDispatch = jest.fn();
const mockUseStateSelector = jest.fn(() => {})
const mockGetInvoices = jest.fn((attr) => attr)
const mockLoadMoreInvoices = jest.fn((attr) => attr)

jest.mock("react-redux", () => ({
  useDispatch: () => () => mockDispatch()
}));

jest.mock("../utils/useStateSelector", () => ({
  useStateSelector: () => mockUseStateSelector()
}));

jest.mock("../state/slices/invoices", () => ({
  getInvoices: (attr) => mockGetInvoices(attr),
  loadMoreInvoices: (attr) => mockLoadMoreInvoices(attr)
}));

afterEach(() => {
  mockUseStateSelector.mockClear()
  mockDispatch.mockClear()
  mockGetInvoices.mockClear()
  mockLoadMoreInvoices.mockClear()
})


it("doesn't render block component if invoicesList is empty", () => {
  mockDispatch.mockImplementation(() => { })
  mockGetInvoices.mockImplementation((attr) => attr)
  mockUseStateSelector.mockImplementation(() => ({
    invoicesList: []
  }));

  const { queryByTestId } = render(<BlockInvoices customerId="" />)
  expect(queryByTestId("block-container")).not.toBeInTheDocument()
})


it("renders one row for each card ordered desc by id", () => {
  mockDispatch.mockImplementation(() => { })
  mockGetInvoices.mockImplementation((attr) => attr)
  mockUseStateSelector.mockImplementation(() => ({
    invoicesList: [
      ...mockInvoices
    ]
  }));

  const { queryAllByTestId } = render(<BlockInvoices customerId="" />)
  expect(queryAllByTestId("invoice-row").length).toBe(2)
})

it("dispatches getInvoices when the component renders", () => {
  mockDispatch.mockImplementation(() => {})
  mockGetInvoices.mockImplementation((attr) => attr)
  mockUseStateSelector.mockImplementation(() => ({
    invoicesList: [
      ...mockInvoices
    ]
  }));

  render(<BlockInvoices customerId="1" />)
  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockGetInvoices).toBeCalledTimes(1)
  expect(mockGetInvoices).toBeCalledWith({ customerId: "1" })
})

it("shows load more button when hasMore is true", () => {
  mockDispatch.mockImplementation(() => {})
  mockGetInvoices.mockImplementation((attr) => attr)
  mockUseStateSelector.mockImplementation(() => ({
    invoicesList: [
      ...mockInvoices
    ],
    hasMore: true
  }));

  const { queryByTestId } = render(<BlockInvoices customerId="" />)

  expect(queryByTestId(dataTestIds.loadMoreButton)).toBeInTheDocument()
})


it("doesn't show load more button when hasMore is false", () => {
  mockDispatch.mockImplementation(() => {})
  mockGetInvoices.mockImplementation((attr) => attr)
  mockUseStateSelector.mockImplementation(() => ({
    invoicesList: [
      ...mockInvoices
    ],
    hasMore: false
  }));

  const { queryByTestId } = render(<BlockInvoices customerId="" />)

  expect(queryByTestId(dataTestIds.loadMoreButton)).not.toBeInTheDocument()
})


it("dispatches loadMoreInvoices when load more is clicked", () => {
  mockDispatch.mockImplementation(() => {})
  mockGetInvoices.mockImplementation((attr) => attr)
  mockLoadMoreInvoices.mockImplementation((attr) => attr)
  mockUseStateSelector.mockImplementation(() => ({
    invoicesList: [
      ...mockInvoices
    ],
    hasMore: true,
    lastObject: "lastObject"
  }));

  const { getByTestId } = render(<BlockInvoices customerId="1" />)
  const loadMoreButton = getByTestId(dataTestIds.loadMoreButton)

  act(() => {
    fireEvent.click(loadMoreButton)
  })

  expect(mockDispatch).toBeCalledTimes(2)
  expect(mockLoadMoreInvoices).toBeCalledTimes(1)
  expect(mockLoadMoreInvoices).toBeCalledWith({
    customerId: "1",
    lastObject: "lastObject"
  })

})
