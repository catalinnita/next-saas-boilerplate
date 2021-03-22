import React from "react"
import { Box, Flex, Heading, Link } from "rebass"
import Stripe from "stripe"
import getSymbolFromCurrency from "currency-symbol-map"
import { getDate } from "../utils/getDate"

export const dataTestIds = {
  container: "invoices-container",
  invoice: "invoices-invoice",
  download: "invoices-download-link"
}

export type Props = {
  invoices: Stripe.Invoice[],
}

export const Invoices: React.FC<Props> = ({ invoices }) => {
  return (
    <Box data-testid={dataTestIds.container}>
      <Heading as="h2">Invoices</Heading>
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
