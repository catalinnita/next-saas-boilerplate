import React from  "react"
import { render } from "@testing-library/react"
import { BlockInvoices, dataTestIds, Props } from "../components/blockInvoices"
import InvoicesMock from "./_mockInvoices"

const props = {
  invoices: InvoicesMock
} as Props

it("renders the invoices component", () => {
  const { getByTestId } = render(<BlockInvoices {...props} />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it("renders one row for each invoice", () => {
  const { queryAllByTestId } = render(<BlockInvoices {...props} />)
  expect(queryAllByTestId(dataTestIds.invoice).length).toBe(2)
})

it("renders the start date in readable format", () => {
  const { getAllByText } = render(<BlockInvoices {...props} />)
  expect(getAllByText("Mar 30 2021").length).toBe(1)
  expect(getAllByText("Apr 30 2021").length).toBe(1)
})

it("renders the amount with symbol and two digits", () => {
  const { getAllByText } = render(<BlockInvoices {...props} />)
  expect(getAllByText("£10").length).toBe(2)
})

it("renders the download link with the href", () => {
  const { getAllByTestId } = render(<BlockInvoices {...props} />)
  expect(getAllByTestId(dataTestIds.download)[0]).toHaveAttribute("href", "https://pay.stripe.com/invoice/acct_1FAcILA8b46monEK/invst_J1wn3m5yOJWsGjJhD7bHWNXV6qftdmt/pdf")
})

