import React from "react"
import { act, fireEvent, render } from "@testing-library/react";
import { useDispatch } from "react-redux"
import { useStateSelector } from "../utils/useStateSelector"
import { setPassword, updatePassword } from "../state/slices/user"
import { FormPassword, dataTestIds } from "../components/formPassword"

const mockDispatch = jest.fn();
const mockUseStateSelector = jest.fn(() => {});
const mockSetPassword = jest.fn((attr) => attr);
const mockUpdatePassword = jest.fn((attr) => attr);

jest.mock('react-redux', () => ({
  useDispatch: () => () => mockDispatch()
}));

jest.mock('../utils/useStateSelector', () => ({
  useStateSelector: () => mockUseStateSelector()
}));

jest.mock("../state/slices/user", () => ({
  setPassword: (attr) => mockSetPassword(attr),
  updatePassword: (attr) => mockUpdatePassword(attr)
}));

beforeEach(() => {
  mockDispatch.mockImplementation(() => { })
  mockUseStateSelector.mockImplementation(() => ({
    password: null,
    error: {
      password: null,
    },
    loading: {
      password: null,
    },
    validation: {
      password: null,
      password1: null,
    },
    success: {
      password: null,
    }
  }))
  mockSetPassword.mockImplementation((attr) => attr)
  mockUpdatePassword.mockImplementation((attr) => attr)
})

afterEach(() => {
  mockDispatch.mockClear()
  mockUseStateSelector.mockClear()
  mockSetPassword.mockClear()
  mockUpdatePassword.mockClear()
})

it("dispatches setPassword when inputs values change", () => {
  const { queryByTestId } = render(<FormPassword />)
  const password1 = queryByTestId(dataTestIds.password1Field)

  act(() => {
    fireEvent.change(password1, { target: { value: 'pass1' } })
  })
  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockSetPassword).toBeCalledTimes(1)
  expect(mockSetPassword).toBeCalledWith({
    password: 'pass1'
  })

  mockDispatch.mockClear()
  mockSetPassword.mockClear()

  const password2 = queryByTestId(dataTestIds.password2Field)

  act(() => {
    fireEvent.change(password2, { target: { value: 'pass2' } })
  })
  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockSetPassword).toBeCalledTimes(1)
  expect(mockSetPassword).toBeCalledWith({
    password1: 'pass2'
  })
})

it("dispatches updatePassword when submit button is clicked", () => {
  mockUseStateSelector.mockImplementation(() => ({
    password: "mockedPassword",
    error: {
      password: null,
    },
    loading: {
      password: null,
    },
    validation: {
      password: null,
      password1: null,
    },
    success: {
      password: null,
    }
  }))

  const { queryByTestId } = render(<FormPassword />)
  const submitButton = queryByTestId(dataTestIds.submitButton)

  act(() => {
    fireEvent.click(submitButton)
  })

  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockUpdatePassword).toBeCalledTimes(1)
  expect(mockUpdatePassword).toBeCalledWith({
    password: 'mockedPassword'
  })

})

it("shows the Loader when loading is true", () => {
  mockUseStateSelector.mockImplementation(() => ({
    password: "mockedPassword",
    error: {
      password: null,
    },
    loading: {
      password: true,
    },
    validation: {
      password: null,
      password1: null,
    },
    success: {
      password: null,
    }
  }))

  const { queryByTestId } = render(<FormPassword />)
  expect(queryByTestId(dataTestIds.loader)).toBeInTheDocument()
})

it("shows the error message when an error is set", () => {
  mockUseStateSelector.mockImplementation(() => ({
    password: "mockedPassword",
    error: {
      password: "mockerError",
    },
    loading: {
      password: null,
    },
    validation: {
      password: null,
      password1: null,
    },
    success: {
      password: null,
    }
  }))

  const { queryByTestId } = render(<FormPassword />)
  expect(queryByTestId(dataTestIds.errorMessage)).toBeInTheDocument()
})

it("shows the success message when success is set", () => {
  mockUseStateSelector.mockImplementation(() => ({
    password: "mockedPassword",
    error: {
      password: null,
    },
    loading: {
      password: null,
    },
    validation: {
      password: null,
      password1: null,
    },
    success: {
      password: "mockedSuccess",
    }
  }))

  const { queryByTestId } = render(<FormPassword />)
  expect(queryByTestId(dataTestIds.successMessage)).toBeInTheDocument()
})
