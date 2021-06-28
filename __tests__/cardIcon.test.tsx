import React from "react"
import { render } from "@testing-library/react"
import { CardIcon, dataTestIds } from "../components/cardIcon"

it("renders default card icon if the name is none of the supported ones", () => {
  const { queryByTestId } = render(<CardIcon name="something" />)
  expect(queryByTestId(`${dataTestIds.cardImage}-default`)).toBeInTheDocument()
})

it("renders specific card icon if the name is visa, mastercard, american express or discover", () => {
  const { queryByTestId } = render(<CardIcon name="American Express" />)
  expect(queryByTestId(`${dataTestIds.cardImage}-american-express`)).toBeInTheDocument()
})
