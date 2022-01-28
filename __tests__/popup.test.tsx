
import React from "react"
import { act, fireEvent, render } from "@testing-library/react";
import { useDispatch } from "react-redux"
import { Popup, dataTestIds } from "../components/popup";
import { closeAllPopups } from "../state/slices/popups"

const mockDispatch = jest.fn();
const mockCloseAllPopups = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => () => mockDispatch()
}));
jest.mock("../state/slices/popups", () => ({
  closeAllPopups: () => mockCloseAllPopups()
}));

beforeEach(() => {
  mockDispatch.mockImplementation(() => { })
})
afterEach(() => {
  mockDispatch.mockClear()
})

it("renders the component children inside popupContent", () => {
  const { queryByTestId } = render(<Popup children={<div className="test-child" />} />)
  expect(queryByTestId(dataTestIds.contentContainer).getElementsByClassName("test-child").length).toBe(1)
})

it("shows close button if showCloseButton is true", () => {
  const { queryByTestId } = render(<Popup children={<div className="test-child" />} />)
  expect(queryByTestId(dataTestIds.closeButton)).toBeInTheDocument()
})

it("doesn't show close button if showCloseButton is false", () => {
  const { queryByTestId } = render(<Popup showCloseButton={false} children={<div className="test-child" />} />)
  expect(queryByTestId(dataTestIds.closeButton)).not.toBeInTheDocument()
})

it("dispatches closeAllPopups when close button is clicked", () => {
  const { queryByTestId } = render(<Popup children={<div className="test-child" />} />)
  const closeButton = queryByTestId(dataTestIds.closeButton)

  act(() => {
    fireEvent.click(closeButton)
  })

  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockCloseAllPopups).toBeCalledTimes(1)

})
