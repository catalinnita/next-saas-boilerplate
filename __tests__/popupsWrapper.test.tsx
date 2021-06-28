import React from "react"
import { act, fireEvent, render } from "@testing-library/react";
import { PopupsWrapper } from "../components/popupsWrapper";
import { useDispatch } from "react-redux"
import { showPopup } from "../state/slices/popups"
import { parseCookies } from 'nookies'
import { useStateSelector } from "../utils/useStateSelector"
import { dataTestIds as setupPopupTestIds } from "../components/popupSetup"
import { dataTestIds as upgradePopupTestIds } from "../components/popupUpgrade"
import { dataTestIds as paymentPopupTestIds } from "../components/popupAddPaymentMethod"

const mockDispatch = jest.fn();
const mockShowPopup = jest.fn((attr) => attr);
const mockParseCookies = jest.fn(() => {});
const mockUseStateSelector = jest.fn(() => {});

jest.mock('react-redux', () => ({
  useDispatch: () => () => mockDispatch()
}));
jest.mock("../state/slices/popups", () => ({
  showPopup: (attr) => mockShowPopup(attr)
}));
jest.mock('nookies', () => ({
  parseCookies: () => mockParseCookies()
}));
jest.mock('../utils/useStateSelector', () => ({
  useStateSelector: () => mockUseStateSelector()
}));

beforeEach(() => {
  mockDispatch.mockImplementation(() => { })
  mockUseStateSelector.mockImplementation(() => ({
    popupToShow: "",
    hasCard: "",
  }))
  mockShowPopup.mockImplementation((attr) => attr)
  mockParseCookies.mockImplementation(() => ({
    setupPopupDisplayed: 1
  }))
})

afterEach(() => {
  mockDispatch.mockClear()
  mockUseStateSelector.mockClear()
  mockShowPopup.mockClear()
  mockParseCookies.mockClear()
})

it("dispaches showPopup if setupPopupDisplayed cookie is missing", () => {
  mockParseCookies.mockImplementation(() => ({}))
  render(<PopupsWrapper><div data-testid="popups-wrapper-child"></div></PopupsWrapper >)
  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockShowPopup).toBeCalledTimes(1)
  expect(mockShowPopup).toBeCalledWith({ popup: "afterRegister" })
})

it("doesn't render PopupSetup popup if setupPopupDisplayed cookie is set", () => {
  const { queryByTestId } = render(<PopupsWrapper><div data-testid="popups-wrapper-child"></div></PopupsWrapper >)
  expect(queryByTestId(setupPopupTestIds.container)).not.toBeInTheDocument()
})

it("renders PopupSetup if popupToShow is afterRegister", () => {
  mockUseStateSelector.mockImplementation(() => ({
    popupToShow: "afterRegister"
  }))
  const { queryByTestId } = render(<PopupsWrapper><div data-testid="popups-wrapper-child"></div></PopupsWrapper >)
  expect(queryByTestId(setupPopupTestIds.container)).toBeInTheDocument()
  expect(queryByTestId("popups-wrapper-child")).not.toBeInTheDocument()
})

it("renders PopupSetup if popupToShow is setup", () => {
  mockUseStateSelector.mockImplementation(() => ({
    popupToShow: "setup"
  }))
  const { queryByTestId } = render(<PopupsWrapper><div data-testid="popups-wrapper-child"></div></PopupsWrapper >)
  expect(queryByTestId(setupPopupTestIds.container)).toBeInTheDocument()
  expect(queryByTestId("popups-wrapper-child")).not.toBeInTheDocument()
})

it("renders PopupAddPaymentMethod if popupToShow is paymentMethod", () => {
  mockUseStateSelector.mockImplementation(() => ({
    popupToShow: "paymentMethod"
  }))
  const { queryByTestId } = render(<PopupsWrapper><div data-testid="popups-wrapper-child"></div></PopupsWrapper >)
  expect(queryByTestId(paymentPopupTestIds.container)).toBeInTheDocument()
  expect(queryByTestId("popups-wrapper-child")).not.toBeInTheDocument()
})

it("renders PopupUpgrade if popupToShow is upgrade", () => {
  mockUseStateSelector.mockImplementation(() => ({
    popupToShow: "upgrade"
  }))
  const { queryByTestId } = render(<PopupsWrapper><div data-testid="popups-wrapper-child"></div></PopupsWrapper >)
  expect(queryByTestId(upgradePopupTestIds.container)).toBeInTheDocument()
  expect(queryByTestId("popups-wrapper-child")).not.toBeInTheDocument()
})

it("renders the children if popupToShow is missing", () => {
  mockUseStateSelector.mockImplementation(() => ({
  }))
  const { queryByTestId } = render(<PopupsWrapper><div data-testid="popups-wrapper-child"></div></PopupsWrapper >)
  expect(queryByTestId("popups-wrapper-child")).toBeInTheDocument()
})
