import Stripe from "stripe"
import React from "react"
import { getDate } from "../utils/getDate"
import getSymbolFromCurrency from "currency-symbol-map"
import { Box, Button, Flex } from "rebass"

export const dataTestIds = {
  download: "invoices-download-link"
}

export type Props = {
  invoice: Stripe.Invoice
}

export const RowInvoice: React.FC<Props> = ({ invoice }) => {
    const formatInvoiceAmount = (invoice) => {
    const sign = invoice.lines.data[0].amount < 0 ? "-" : ""
    const currencySymbol = getSymbolFromCurrency(invoice.lines.data[0].currency)
    const positiveAmount = Math.abs(invoice.lines.data[0].amount) / 100

    return `${sign}${currencySymbol}${positiveAmount.toFixed(2)}`
    }

  return (
    <>
      <Box variant="rowStyle">{invoice.lines.data[0].description}</Box>
      <Box variant="rowStyle">{getDate(invoice.lines.data[0].period.start)}</Box>
      <Box variant="rowStyle">{getDate(invoice.lines.data[0].period.end)}</Box>
      <Box variant="rowStyle">{invoice.status}</Box>
      <Box variant="rowStyle"><Flex justifyContent="flex-end">{formatInvoiceAmount(invoice)}</Flex></Box>
      <Box variant="rowStyle">
        <Flex justifyContent="flex-end">
          <Button
            data-testid={dataTestIds.download}
            variant="smallGhostGrey"
            onClick={() => { window.location.href = invoice.invoice_pdf }}
            >Download</Button>
        </Flex>
      </Box>
    </>
  )
}
