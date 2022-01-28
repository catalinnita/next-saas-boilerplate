import React from "react"
import { act, fireEvent, render } from "@testing-library/react";
import { useDispatch } from "react-redux"
import { useStateSelector } from "../utils/useStateSelector"
import { updateProfile, setProfile } from "../state/slices/user"
import { FormProfile, dataTestIds } from "../components/formProfile"

const mockDispatch = jest.fn();
const mockUseStateSelector = jest.fn(() => {});
const mockSetProfile = jest.fn((attr) => attr);
const mockUpdateProfile = jest.fn((attr) => attr);

jest.mock("react-redux", () => ({
  useDispatch: () => () => mockDispatch()
}));

jest.mock("../utils/useStateSelector", () => ({
  useStateSelector: () => mockUseStateSelector()
}));

jest.mock("../state/slices/user", () => ({
  setProfile: (attr) => mockSetProfile(attr),
  updateProfile: (attr) => mockUpdateProfile(attr)
}));

beforeEach(() => {
  mockDispatch.mockImplementation(() => { })
  mockUseStateSelector.mockImplementation(() => ({
    email: "",
    name: "",
    error: {
      profile: null,
    },
    loading: {
      profile: null,
    },
    validation: {
      nickname: null,
      email: null,
    },
    success: {
      profile: null,
    },
  }))
  mockSetProfile.mockImplementation((attr) => attr)
  mockUpdateProfile.mockImplementation((attr) => attr)
})

afterEach(() => {
  mockDispatch.mockClear()
  mockUseStateSelector.mockClear()
  mockSetProfile.mockClear()
  mockUpdateProfile.mockClear()
})

it("dispatches setProfile when inputs values change", () => {
  const { queryByTestId } = render(<FormProfile />)
  const email = queryByTestId(dataTestIds.emailField)

  act(() => {
    fireEvent.change(email, { target: { value: "test@test.com" } })
  })
  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockSetProfile).toBeCalledTimes(1)
  expect(mockSetProfile).toBeCalledWith({
    email: "test@test.com"
  })

  mockDispatch.mockClear()
  mockSetProfile.mockClear()

  const name = queryByTestId(dataTestIds.nameField)

  act(() => {
    fireEvent.change(name, { target: { value: "john doe" } })
  })
  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockSetProfile).toBeCalledTimes(1)
  expect(mockSetProfile).toBeCalledWith({
    nickname: "john doe"
  })
})

it("dispatches updateProfile when submit button is clicked", () => {
  mockUseStateSelector.mockImplementation(() => ({
    email: "mockedEmail",
    name: "mockedName",
    error: {
      profile: null,
    },
    loading: {
      profile: null,
    },
    validation: {
      nickname: null,
      email: null,
    },
    success: {
      profile: null,
    },
  }))

  const { queryByTestId } = render(<FormProfile />)
  const submitButton = queryByTestId(dataTestIds.submitButton)

  act(() => {
    fireEvent.click(submitButton)
  })

  expect(mockDispatch).toBeCalledTimes(1)
  expect(mockUpdateProfile).toBeCalledTimes(1)
  expect(mockUpdateProfile).toBeCalledWith({
    email: "mockedEmail",
    nickname: "mockedName",
  })

})

it("shows the Loader when loading is true", () => {
  mockUseStateSelector.mockImplementation(() => ({
    email: "mockedEmail",
    name: "mockedName",
    error: {
      profile: null,
    },
    loading: {
      profile: true,
    },
    validation: {
      nickname: null,
      email: null,
    },
    success: {
      profile: null,
    },
  }))

  const { queryByTestId } = render(<FormProfile />)
  expect(queryByTestId(dataTestIds.loader)).toBeInTheDocument()
})

it("shows the error message when an error is set", () => {
  mockUseStateSelector.mockImplementation(() => ({
    email: "mockedEmail",
    name: "mockedName",
    error: {
      profile: "errorMessage",
    },
    loading: {
      profile: null,
    },
    validation: {
      nickname: null,
      email: null,
    },
    success: {
      profile: null,
    },
  }))

  const { queryByTestId } = render(<FormProfile />)
  expect(queryByTestId(dataTestIds.errorMessage)).toBeInTheDocument()
})

it("shows the success message when success is set", () => {
  mockUseStateSelector.mockImplementation(() => ({
    email: "mockedEmail",
    name: "mockedName",
    error: {
      profile: null,
    },
    loading: {
      profile: null,
    },
    validation: {
      nickname: null,
      email: null,
    },
    success: {
      profile: "successMessage",
    },
  }))

  const { queryByTestId } = render(<FormProfile />)
  expect(queryByTestId(dataTestIds.successMessage)).toBeInTheDocument()
})
