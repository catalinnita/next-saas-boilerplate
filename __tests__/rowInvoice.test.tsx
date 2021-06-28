import React from "react"
import mockInvoices from "./_mockInvoices"
import { act, fireEvent, render } from "@testing-library/react"
import { RowInvoice, dataTestIds } from "../components/rowInvoice"
import Stripe from "stripe"


it("updates the window location when download button is clicked", () => {
  const { getByTestId } = render(<RowInvoice invoice={mockInvoices[0] as Stripe.Invoice} />)
  const downloadButton = getByTestId(dataTestIds.download)

  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      href: ""
    }
  });

  act(() => {
    fireEvent.click(downloadButton)
  })

  expect(window.location.href).toBe(mockInvoices[0].invoice_pdf)
})

it("formats the invoice amount for positive values", () => {
  const { getByText } = render(<RowInvoice invoice={mockInvoices[0] as Stripe.Invoice} />)
  expect(getByText("£10.00")).toBeInTheDocument()
})

it("formats the invoice amount for negative values", () => {
  const { getByText } = render(<RowInvoice invoice={mockInvoices[1] as Stripe.Invoice} />)
  expect(getByText("-£10.00")).toBeInTheDocument()
})
