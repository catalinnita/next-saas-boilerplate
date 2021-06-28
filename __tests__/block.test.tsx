import React from "react"
import { render } from "@testing-library/react"
import { Block, dataTestIds } from "../components/block"

it("renders the header if there is a headerLeft prop", () => {
  const { getByTestId } = render(
    <Block
      gridTemplateColumns={[10, 50, 40]}
      headerLeft={<div className="headerLeft"></div>}
    >
      <div></div>
    </Block>)

  const headerLeft = getByTestId(dataTestIds.container).getElementsByClassName("headerLeft")
  expect(headerLeft.length).toBe(1)
  expect(getByTestId(dataTestIds.header)).toBeInTheDocument()
})

it("renders the header if there is a headerRight prop", () => {
  const { getByTestId } = render(
    <Block
      gridTemplateColumns={[10, 50, 40]}
      headerRight={<div className="headerRight"></div>}
    >
      <div></div>
    </Block>)

  const headerRight = getByTestId(dataTestIds.container).getElementsByClassName("headerRight")
  expect(headerRight.length).toBe(1)
  expect(getByTestId(dataTestIds.header)).toBeInTheDocument()
})

it("doesn't render the header if there is not header props", () => {
  const { queryByTestId } = render(
    <Block
      gridTemplateColumns={[10, 50, 40]}
    >
      <div></div>
    </Block>)

  expect(queryByTestId(dataTestIds.header)).not.toBeInTheDocument()
})

it("renders the children of the block component", () => {
  const { getByTestId } = render(
    <Block
      gridTemplateColumns={[10, 50, 40]}
    >
      <div className="child-1"></div>
      <div className="child-2"></div>
    </Block>)

  const child1 = getByTestId(dataTestIds.container).getElementsByClassName("child-1")
  const child2 = getByTestId(dataTestIds.container).getElementsByClassName("child-2")
  expect(child1.length).toBe(1)
  expect(child2.length).toBe(1)
})

// it("sets the right grindTemplateColumns value for the block container", () => {

// })

// it("sets the right gridColumnEnd value for block header", () => {

// })


