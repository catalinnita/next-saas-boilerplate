import React from  "react"
import ReactTestRenderer from "react-test-renderer"
import { render } from "@testing-library/react"
import { Flex } from "rebass"
import { PaymentMethods, dataTestIds, Props } from "../components/paymentMethods"

const props = {
  cards: [{
    "id": "card_1IXUKjA8b46monEK0mD6CnJb",
    "object": "card",
    "address_city": null,
    "address_country": null,
    "address_line1": null,
    "address_line1_check": null,
    "address_line2": null,
    "address_state": null,
    "address_zip": null,
    "address_zip_check": null,
    "brand": "Visa",
    "country": "US",
    "customer": "cus_J9nw1c0LRJRkSn",
    "cvc_check": "pass",
    "dynamic_last4": null,
    "exp_month": 9,
    "exp_year": 2022,
    "fingerprint": "09DFmsWo661SVPnz",
    "funding": "credit",
    "last4": "4242",
    "metadata": {},
    "name": null,
    "tokenization_method": null
  },
  {
    "id": "card_1IXUKjA8b46monEK0mD6CnJc",
    "object": "card",
    "address_city": null,
    "address_country": null,
    "address_line1": null,
    "address_line1_check": null,
    "address_line2": null,
    "address_state": null,
    "address_zip": null,
    "address_zip_check": null,
    "brand": "Visa",
    "country": "US",
    "customer": "cus_J9nw1c0LRJRkSn",
    "cvc_check": "pass",
    "dynamic_last4": null,
    "exp_month": 8,
    "exp_year": 2000,
    "fingerprint": "09DFmsWo661SVPnz",
    "funding": "credit",
    "last4": "4242",
    "metadata": {},
    "name": null,
    "tokenization_method": null
  }]
} as Props

it("renders the PaymentMethods component", () => {
  const { getByTestId } = render(<PaymentMethods {...props} />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it("renders the one row for each card", () => {
  const { queryAllByTestId } = render(<PaymentMethods {...props} />)
  expect(queryAllByTestId(dataTestIds.card).length).toBe(2)
})

it("rendres a component with specific props", () => {
  const renderer = ReactTestRenderer.create(
    <PaymentMethods {...props} />
  )
  const componentInstance = renderer.root
  expect(componentInstance.findAllByType(Flex)[0].props.variant).toBe(null)
  expect(componentInstance.findAllByType(Flex)[1].props.variant).toBe("disabled")
})

