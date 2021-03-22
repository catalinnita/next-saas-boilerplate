import React from  "react"
import ReactTestRenderer from "react-test-renderer"
import { render } from "@testing-library/react"
import { Invoices, dataTestIds, Props } from "../components/invoices"

const props = {
  invoices: [{
    "id": "in_1IPsuNA8b46monEKwbJNOii7",
    "object": "invoice",
    "account_country": "GB",
    "account_name": null,
    "account_tax_ids": null,
    "amount_due": 0,
    "amount_paid": 0,
    "amount_remaining": 0,
    "application_fee_amount": null,
    "attempt_count": 0,
    "attempted": true,
    "auto_advance": false,
    "billing_reason": "subscription_create",
    "charge": null,
    "collection_method": "charge_automatically",
    "created": 1614532699,
    "currency": "gbp",
    "custom_fields": null,
    "customer": "cus_J9nw1c0LRJRkSn",
    "customer_address": null,
    "customer_email": "catalinnita01@gmail.com",
    "customer_name": null,
    "customer_phone": null,
    "customer_shipping": null,
    "customer_tax_exempt": "none",
    "customer_tax_ids": [],
    "default_payment_method": null,
    "default_source": null,
    "default_tax_rates": [],
    "description": null,
    "discount": null,
    "discounts": [],
    "due_date": null,
    "ending_balance": 0,
    "footer": null,
    "hosted_invoice_url": "https://invoice.stripe.com/i/acct_1FAcILA8b46monEK/invst_J1wn3m5yOJWsGjJhD7bHWNXV6qftdmt",
    "invoice_pdf": "https://pay.stripe.com/invoice/acct_1FAcILA8b46monEK/invst_J1wn3m5yOJWsGjJhD7bHWNXV6qftdmt/pdf",
    "last_finalization_error": null,
    "lines": {
      "data": [
        {
          "id": "il_tmp_43b8b5cbb51968",
          "object": "line_item",
          "amount": 1000,
          "currency": "gbp",
          "description": "1 × Membership (at £10.00 / month)",
          "discount_amounts": [],
          "discountable": true,
          "discounts": [],
          "livemode": false,
          "metadata": {},
          "period": {
            "end": 1619803099,
            "start": 1617124699
          },
          "price": {
            "id": "price_1IPstuA8b46monEKnXdqYbFD",
            "object": "price",
            "active": true,
            "billing_scheme": "per_unit",
            "created": 1614532670,
            "currency": "gbp",
            "livemode": false,
            "lookup_key": null,
            "metadata": {},
            "nickname": null,
            "product": "prod_J1wnR4gm23p2cE",
            "recurring": {
              "aggregate_usage": null,
              "interval": "month",
              "interval_count": 1,
              "usage_type": "licensed"
            },
            "tiers_mode": null,
            "transform_quantity": null,
            "type": "recurring",
            "unit_amount": 1000,
            "unit_amount_decimal": "1000"
          },
          "proration": false,
          "quantity": 1,
          "subscription": "sub_J1wnT5X6ETnjJx",
          "subscription_item": "si_J1wnvRdh6s7ZGt",
          "tax_amounts": [],
          "tax_rates": [],
          "type": "subscription"
        }
      ],
      "has_more": false,
      "object": "list",
      "url": "/v1/invoices/in_1IPsuNA8b46monEKwbJNOii7/lines"
    },
    "livemode": false,
    "metadata": {},
    "next_payment_attempt": null,
    "number": "0DFFBC09-0001",
    "on_behalf_of": null,
    "paid": true,
    "payment_intent": null,
    "payment_settings": {
      "payment_method_options": null,
      "payment_method_types": null
    },
    "period_end": 1614532699,
    "period_start": 1614532699,
    "post_payment_credit_notes_amount": 0,
    "pre_payment_credit_notes_amount": 0,
    "receipt_number": null,
    "starting_balance": 0,
    "statement_descriptor": null,
    "status": "paid",
    "status_transitions": {
      "finalized_at": 1614532699,
      "marked_uncollectible_at": null,
      "paid_at": 1614532699,
      "voided_at": null
    },
    "subscription": "sub_J1wnT5X6ETnjJx",
    "subtotal": 0,
    "tax": null,
    "total": 0,
    "total_discount_amounts": [],
    "total_tax_amounts": [],
    "transfer_data": null,
    "webhooks_delivered_at": 1614532699
  },
  {
    "id": "in_1IPsuNA8b46monEKwbJNOii8",
    "object": "invoice",
    "account_country": "GB",
    "account_name": null,
    "account_tax_ids": null,
    "amount_due": 0,
    "amount_paid": 0,
    "amount_remaining": 0,
    "application_fee_amount": null,
    "attempt_count": 0,
    "attempted": true,
    "auto_advance": false,
    "billing_reason": "subscription_create",
    "charge": null,
    "collection_method": "charge_automatically",
    "created": 1614532699,
    "currency": "gbp",
    "custom_fields": null,
    "customer": "cus_J9nw1c0LRJRkSn",
    "customer_address": null,
    "customer_email": "catalinnita01@gmail.com",
    "customer_name": null,
    "customer_phone": null,
    "customer_shipping": null,
    "customer_tax_exempt": "none",
    "customer_tax_ids": [],
    "default_payment_method": null,
    "default_source": null,
    "default_tax_rates": [],
    "description": null,
    "discount": null,
    "discounts": [],
    "due_date": null,
    "ending_balance": 0,
    "footer": null,
    "hosted_invoice_url": "https://invoice.stripe.com/i/acct_1FAcILA8b46monEK/invst_J1wn3m5yOJWsGjJhD7bHWNXV6qftdmt",
    "invoice_pdf": "https://pay.stripe.com/invoice/acct_1FAcILA8b46monEK/invst_J1wn3m5yOJWsGjJhD7bHWNXV6qftdmt/pdf",
    "last_finalization_error": null,
    "lines": {
      "data": [
        {
          "id": "il_tmp_43b8b5cbb51968",
          "object": "line_item",
          "amount": 1000,
          "currency": "gbp",
          "description": "1 × Membership (at £10.00 / month)",
          "discount_amounts": [],
          "discountable": true,
          "discounts": [],
          "livemode": false,
          "metadata": {},
          "period": {
            "end": 1719803100,
            "start": 1718124700
          },
          "price": {
            "id": "price_1IPstuA8b46monEKnXdqYbFD",
            "object": "price",
            "active": true,
            "billing_scheme": "per_unit",
            "created": 1614532670,
            "currency": "gbp",
            "livemode": false,
            "lookup_key": null,
            "metadata": {},
            "nickname": null,
            "product": "prod_J1wnR4gm23p2cE",
            "recurring": {
              "aggregate_usage": null,
              "interval": "month",
              "interval_count": 1,
              "usage_type": "licensed"
            },
            "tiers_mode": null,
            "transform_quantity": null,
            "type": "recurring",
            "unit_amount": 1000,
            "unit_amount_decimal": "1000"
          },
          "proration": false,
          "quantity": 1,
          "subscription": "sub_J1wnT5X6ETnjJx",
          "subscription_item": "si_J1wnvRdh6s7ZGt",
          "tax_amounts": [],
          "tax_rates": [],
          "type": "subscription"
        }
      ],
      "has_more": false,
      "object": "list",
      "url": "/v1/invoices/in_1IPsuNA8b46monEKwbJNOii7/lines"
    },
    "livemode": false,
    "metadata": {},
    "next_payment_attempt": null,
    "number": "0DFFBC09-0001",
    "on_behalf_of": null,
    "paid": true,
    "payment_intent": null,
    "payment_settings": {
      "payment_method_options": null,
      "payment_method_types": null
    },
    "period_end": 1614532699,
    "period_start": 161453261,
    "post_payment_credit_notes_amount": 0,
    "pre_payment_credit_notes_amount": 0,
    "receipt_number": null,
    "starting_balance": 0,
    "statement_descriptor": null,
    "status": "open",
    "status_transitions": {
      "finalized_at": 1614532699,
      "marked_uncollectible_at": null,
      "paid_at": 1614532699,
      "voided_at": null
    },
    "subscription": "sub_J1wnT5X6ETnjJx",
    "subtotal": 0,
    "tax": null,
    "total": 0,
    "total_discount_amounts": [],
    "total_tax_amounts": [],
    "transfer_data": null,
    "webhooks_delivered_at": 1614532699
  }]
} as Props

it("renders the invoices component", () => {
  const { getByTestId } = render(<Invoices {...props} />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it("renders one row for each invoice", () => {
  const { queryAllByTestId } = render(<Invoices {...props} />)
  expect(queryAllByTestId(dataTestIds.invoice).length).toBe(2)
})

it("renders the start date in readable format", () => {
  const { getAllByText } = render(<Invoices {...props} />)
  expect(getAllByText("Mar 30 2021").length).toBe(1)
  expect(getAllByText("Apr 30 2021").length).toBe(1)
})

it("renders the amount with symbol and two digits", () => {
  const { getAllByText } = render(<Invoices {...props} />)
  expect(getAllByText("£10").length).toBe(2)
})

it("renders the download link with the href", () => {
  const { getAllByTestId } = render(<Invoices {...props} />)
  expect(getAllByTestId(dataTestIds.download)[0]).toHaveAttribute("href", "https://pay.stripe.com/invoice/acct_1FAcILA8b46monEK/invst_J1wn3m5yOJWsGjJhD7bHWNXV6qftdmt/pdf")
})

