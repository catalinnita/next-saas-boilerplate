import React, { useState } from "react"
import { fireEvent, render } from "@testing-library/react"
import { FormCreditCard, dataTestIds } from "../components/formCreditCard"

const realUseState = React.useState
const stubInitialState = {
  nameOnCard: "John D",
  cardNumber: "4444444444444444",
  expiryDate: "12/21",
  cvc: "777",
}

const useStateMock = jest.spyOn(React, "useState")

it("renders the FormCreditCard component", async () => {
  const { getByTestId } = render(<FormCreditCard />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it("renders the NameOnCard input component", async () => {
  const { getByTestId } = render(<FormCreditCard />)
  expect(getByTestId(dataTestIds.nameOnCard)).toBeInTheDocument()
})

it("renders the CardNumber input component", async () => {
  const { getByTestId } = render(<FormCreditCard />)
  expect(getByTestId(dataTestIds.cardNumber)).toBeInTheDocument()
})

it("renders the ExpiryDate input component", async () => {
  const { getByTestId } = render(<FormCreditCard />)
  expect(getByTestId(dataTestIds.expiryDate)).toBeInTheDocument()
})

it("renders the CVC input component", async () => {
  const { getByTestId } = render(<FormCreditCard />)
  expect(getByTestId(dataTestIds.cvc)).toBeInTheDocument()
})

it("renders the Add Payment Method button", async () => {
  const { getByTestId } = render(<FormCreditCard />)
  expect(getByTestId(dataTestIds.submitButton)).toBeInTheDocument()
})

it("sets the input values according with the state value", async () => {
  useStateMock.mockImplementation(() => realUseState(stubInitialState))
  const { getByTestId } = render(<FormCreditCard />)
  expect(getByTestId(dataTestIds.nameOnCard)).toHaveValue(stubInitialState.nameOnCard)
  expect(getByTestId(dataTestIds.cardNumber)).toHaveValue(stubInitialState.cardNumber)
  expect(getByTestId(dataTestIds.expiryDate)).toHaveValue(stubInitialState.expiryDate)
  expect(getByTestId(dataTestIds.cvc)).toHaveValue(stubInitialState.cvc)
})


it("updates the cardInfo when nameOnCard field is changed", async () => {
  const setState = jest.fn()
  useStateMock.mockImplementation(() => [{}, setState]);
  const { getByTestId } = render(<FormCreditCard />)
  fireEvent.change(getByTestId(dataTestIds.nameOnCard), {target: { value: "Joe D" }})
  expect(setState).toHaveBeenCalledWith(expect.objectContaining({nameOnCard: "Joe D"}))
})

it("updates the cardInfo when cardNumber field is changed", async () => {
  const setState = jest.fn()
  useStateMock.mockImplementation(() => [{}, setState]);
  const { getByTestId } = render(<FormCreditCard />)
  fireEvent.change(getByTestId(dataTestIds.cardNumber), {target: { value: "4444222211110000" }})
  expect(setState).toHaveBeenCalledWith(expect.objectContaining({cardNumber: "4444222211110000"}))
})

it("updates the cardInfo when expiryDate field is changed", async () => {
  const setState = jest.fn()
  useStateMock.mockImplementation(() => [{}, setState]);
  const { getByTestId } = render(<FormCreditCard />)
  fireEvent.change(getByTestId(dataTestIds.expiryDate), {target: { value: "11/21" }})
  expect(setState).toHaveBeenCalledWith(expect.objectContaining({expiryDate: "11/21"}))
})


it("updates the cardInfo when cvc field is changed", async () => {
  const setState = jest.fn()
  useStateMock.mockImplementation(() => [{}, setState]);
  const { getByTestId } = render(<FormCreditCard />)
  fireEvent.change(getByTestId(dataTestIds.cvc), {target: { value: "123" }})
  expect(setState).toHaveBeenCalledWith(expect.objectContaining({cvc: "123"}))
})
