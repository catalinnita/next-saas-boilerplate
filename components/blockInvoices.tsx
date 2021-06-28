import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Box, Button, Flex, Heading, Link } from "rebass"
import { getInvoices, loadMoreInvoices } from "../state/slices/invoices"
import { useStateSelector } from "../utils/useStateSelector"
import { Block } from "./block"
import { RowInvoice } from "./rowInvoice"

export const dataTestIds = {
  container: "invoices-container",
  invoice: "invoices-invoice",
  loadMoreButton: "invoices-load-more"
}

export type Props = {
  customerId: string
}

export const BlockInvoices: React.FC<Props> = ({ customerId }) => {
  const dispatch = useDispatch()
  const { invoicesList, hasMore, lastObject } = useStateSelector("invoices")

  useEffect(() => {
    dispatch(getInvoices({ customerId }))
  }, [customerId])

  if (!invoicesList || invoicesList.length < 1) {
    return null
  }

  return (
    <Box data-testid={dataTestIds.container}>

      <Block
        gridTemplateColumns={[35, 15, 15, 10, 10, 15]}
        headerLeft={<Heading as="h3">Invoices</Heading>}
      >
        {invoicesList.map(invoice => (
          <RowInvoice
            key={invoice.id}
            invoice={invoice}
          />)
        )}
      </Block>

      { hasMore &&
        <Flex justifyContent="center">
        <Button
            data-testid={dataTestIds.loadMoreButton}
            variant="greyGhostSmall"
            onClick={() => {
              dispatch(
                loadMoreInvoices({
                  customerId,
                  lastObject
                })
              )
            }}
          >Load More</Button>
        </Flex>}
    </Box>
  )
}
