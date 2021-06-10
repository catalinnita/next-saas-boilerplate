import React from "react"
import { Box, Button, Flex, Heading, Link } from "rebass"
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
  hasMore: boolean,
  loadMore: (lastObject: string) => void
}

export const Invoices: React.FC<Props> = ({ invoices, hasMore, loadMore }) => {
  const formatInvoiceAmount = (invoice) => {
    const sign = invoice.lines.data[0].amount < 0 ? "-" : ""
    const currencySymbol = getSymbolFromCurrency(invoice.lines.data[0].currency)
    const positiveAmount = Math.abs(invoice.lines.data[0].amount) / 100

    return `${sign}${currencySymbol}${positiveAmount.toFixed(2)}`
  }
  return (
    <Box data-testid={dataTestIds.container}>

      <Box
        data-testid={dataTestIds.invoice}
        variant="tableStyle"
        sx={{
          gridTemplateColumns: "35% 15% 15% 10% 10% 15%",
        }}
      >
        <Flex justifyContent="space-between" alignItems="center"
          backgroundColor="white"
          p="12px 16px"
          sx={{
            gridColumnStart: 1,
            gridColumnEnd: 7
          }}>
          <Heading as="h3" fontSize="18px">Invoices</Heading>
        </Flex>

        {invoices.map(invoice => (
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
        ))
        }
      </Box>
      { hasMore &&
        <Flex justifyContent="center">
          <Button
            variant="smallGhostGrey"
            onClick={() => { loadMore(invoices.slice(-1)[0].id ) }}
            >Load More</Button>
          </Flex>}
    </Box>
  )
}
