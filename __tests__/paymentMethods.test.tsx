import React from  "react"
import ReactTestRenderer from "react-test-renderer"
import { render } from "@testing-library/react"
import { Flex } from "rebass"
import { BlockCards, dataTestIds, Props } from "../components/blockCards"
import CardsMock from "./_mockCards"

const props = {
  cards: CardsMock
} as Props

it("renders the BlockCards component", () => {
  const { getByTestId } = render(<BlockCards {...props} />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it("renders the one row for each card", () => {
  const { queryAllByTestId } = render(<BlockCards {...props} />)
  expect(queryAllByTestId(dataTestIds.card).length).toBe(2)
})

it("rendres a component with specific props", () => {
  const renderer = ReactTestRenderer.create(
    <BlockCards {...props} />
  )
  const componentInstance = renderer.root
  expect(componentInstance.findAllByType(Flex)[0].props.variant).toBe(null)
  expect(componentInstance.findAllByType(Flex)[1].props.variant).toBe("disabled")
})

