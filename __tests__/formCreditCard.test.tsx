import React from "react"
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { useStripe, useElements } from "@stripe/react-stripe-js"
import { FormCreditCard, dataTestIds } from "../components/formCreditCard";
import { StripeElementsProvider } from "../components/stripeElementsProvider";

const mockUseStripe = jest.fn()
const mockUseElements = jest.fn()
const mockOnSubmitCallback = jest.fn((attr) => attr)

jest.mock("@stripe/react-stripe-js", () => ({
  ...jest.requireActual("@stripe/react-stripe-js"),
  useStripe: () => mockUseStripe(() => {}),
  useElements: () => mockUseElements(() => {}),
}))

beforeEach(() => {
  mockUseStripe.mockImplementation(() => ({
    createToken: () => ({
      error: null,
      token: {
        id: "mockedTokenId"
      }
    })
  }))

  mockUseElements.mockImplementation(() => ({
    getElement: () => ({})
  }))

  mockOnSubmitCallback.mockImplementation((attr) => attr)
})

afterEach(() => {
  mockUseStripe.mockClear()
  mockUseElements.mockClear()
  mockOnSubmitCallback.mockClear()
})

it("calls onSubmitCallback when submit button is called", async () => {
  const { queryByTestId } = render(<StripeElementsProvider><FormCreditCard onSubmitCallback={(attr) => { mockOnSubmitCallback(attr) }} /></StripeElementsProvider>)
  const submitButton = queryByTestId(dataTestIds.submitButton)
  act(() => {
    fireEvent.click(submitButton)
  })

  await waitFor(() => expect(mockOnSubmitCallback).toBeCalledTimes(1))
  await waitFor(() => expect(mockOnSubmitCallback).toBeCalledWith({ cardToken: "mockedTokenId" }))
})

it("doesn't call onSubmitCallback if there is an error", async () => {
  mockUseStripe.mockImplementation(() => ({
    createToken: () => ({
      error: "error message",
      token: {
        id: "mockedTokenId"
      }
    })
  }))

  const { queryByTestId } = render(<StripeElementsProvider><FormCreditCard onSubmitCallback={(attr) => { mockOnSubmitCallback(attr) }} /></StripeElementsProvider>)
  const submitButton = queryByTestId(dataTestIds.submitButton)
  act(() => {
    fireEvent.click(submitButton)
  })

  await waitFor(() => expect(mockOnSubmitCallback).toBeCalledTimes(0))
})

it("doesn't call onSubmitCallback if stripe is not available", async () => {
  mockUseStripe.mockImplementation(() => (null))
  const { queryByTestId } = render(<StripeElementsProvider><FormCreditCard onSubmitCallback={(attr) => { mockOnSubmitCallback(attr) }} /></StripeElementsProvider>)
  const submitButton = queryByTestId(dataTestIds.submitButton)
  act(() => {
    fireEvent.click(submitButton)
  })

  await waitFor(() => expect(mockOnSubmitCallback).toBeCalledTimes(0))
})

it("doesn't call onSubmitCallback if elements is not available", async () => {
  mockUseElements.mockImplementation(() => (null))
  const { queryByTestId } = render(<StripeElementsProvider><FormCreditCard onSubmitCallback={(attr) => { mockOnSubmitCallback(attr) }} /></StripeElementsProvider>)
  const submitButton = queryByTestId(dataTestIds.submitButton)
  act(() => {
    fireEvent.click(submitButton)
  })

  await waitFor(() => expect(mockOnSubmitCallback).toBeCalledTimes(0))
})
