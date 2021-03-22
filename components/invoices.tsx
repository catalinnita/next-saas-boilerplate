import React from "react"
import { Box, Flex, Link } from "rebass"
import Stripe from "stripe"
import getSymbolFromCurrency from "currency-symbol-map"

export const dataTestIds = {
  container: "invoices-container",
  invoice: "invoices-invoice",
  download: "invoices-download-link"
}

export type Props = {
  invoices: Stripe.Invoice[],
}

export const Invoices: React.FC<Props> = ({ invoices }) => {
  const getDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    return date.toString().slice(4, 15)
  }
  return (
    <Box data-testid={dataTestIds.container}>
      {invoices.map(invoice => (
        <Flex data-testid={dataTestIds.invoice} key={invoice.id}>
          <Box>{invoice.lines.data[0].description}</Box>
          <Box>{getDate(invoice.lines.data[0].period.start)}</Box>
          <Box>{getDate(invoice.lines.data[0].period.end)}</Box>
          <Box>{invoice.status}</Box>
          <Box>{getSymbolFromCurrency(invoice.lines.data[0].currency)}{invoice.lines.data[0].amount / 100}</Box>
          <Box><Link data-testid={dataTestIds.download} href={invoice.invoice_pdf}>Download</Link></Box>
        </Flex>))
      }
    </Box>
  )
}
