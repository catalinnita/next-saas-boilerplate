import React, { useState } from "react"
import { act, fireEvent, render } from "@testing-library/react"
import { Header, dataTestIds } from "../components/header"
import { useThemeUI } from "theme-ui"

const mockUseThemeUI = jest.fn()
const mockUseState = jest.fn()
const mockSetShowAccountMenu = jest.fn((attr) => attr)

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: () => mockUseState()
}));

jest.mock("theme-ui", () => ({
  useThemeUI: () => mockUseThemeUI()
}));

beforeEach(() => {
  mockSetShowAccountMenu.mockImplementation((attr) => attr)
  mockUseState.mockImplementation(() => ([
    false,
    mockSetShowAccountMenu
  ]))
  mockUseThemeUI.mockImplementation(() => ({
    theme: {
      colors: {
        primary: "#ccc"
      }
    }
  }))
})

afterEach(() => {
  mockUseState.mockClear()
})


it("dispatches setShowAccountMenu when account icon is clicked", () => {
  const { queryByTestId } = render(<Header />)
  const accountIcon = queryByTestId(dataTestIds.accountIcon)

  act(() => {
    fireEvent.click(accountIcon)
  })

  expect(mockSetShowAccountMenu).toBeCalledTimes(1)
  expect(mockSetShowAccountMenu).toBeCalledWith(true)
})

it("shows NavigationAccount when showAccountMenu is set", () => {
  mockUseState.mockImplementation(() => ([
    true,
  ]))
  const { queryByTestId } = render(<Header />)
  const style = window.getComputedStyle(queryByTestId(dataTestIds.accountMenuContainer))
  expect(style.display).toBe("block")
})

it("doesn't show NavigationAccount when showAccountMenu is not set", () => {
  mockUseState.mockImplementation(() => ([
    false,
  ]))
  const { queryByTestId } = render(<Header />)
  const style = window.getComputedStyle(queryByTestId(dataTestIds.accountMenuContainer))
  expect(style.display).toBe("none")
})
