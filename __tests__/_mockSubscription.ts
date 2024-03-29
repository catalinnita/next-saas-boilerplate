export const mockSubscriptionCanceled = {
  "id": "sub_J1wnT5X6ETnjJx",
  "object": "subscription",
  "application_fee_percent": null,
  "billing_cycle_anchor": 1617124699,
  "billing_thresholds": null,
  "cancel_at": null,
  "cancel_at_period_end": false,
  "canceled_at": 1615324679,
  "collection_method": "charge_automatically",
  "created": 1614532699,
  "current_period_end": 1617124699,
  "current_period_start": 1614532699,
  "customer": "cus_J1wnE2tmLriEKp",
  "days_until_due": null,
  "default_payment_method": null,
  "default_source": null,
  "default_tax_rates": [],
  "discount": null,
  "ended_at": 1615324679,
  "items": {
    "object": "list",
    "data": [
      {
        "id": "si_J1wnvRdh6s7ZGt",
        "object": "subscription_item",
        "billing_thresholds": null,
        "created": 1614532700,
        "metadata": {},
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
        "quantity": 1,
        "subscription": "sub_J1wnT5X6ETnjJx",
        "tax_rates": []
      }
    ],
    "has_more": false,
    "url": "/v1/subscription_items?subscription=sub_J1wnT5X6ETnjJx"
  },
  "latest_invoice": "in_1IPsuNA8b46monEKwbJNOii7",
  "livemode": false,
  "metadata": {},
  "next_pending_invoice_item_invoice": null,
  "pause_collection": null,
  "pending_invoice_item_interval": null,
  "pending_setup_intent": null,
  "pending_update": null,
  "schedule": null,
  "start_date": 1614532699,
  "status": "canceled",
  "transfer_data": null,
  "trial_end": 1617124699,
  "trial_start": 1614532699
}

export const subscriptionTrialMock = {
  "id": "sub_J1wnT5X6ETnjJx",
  "object": "subscription",
  "application_fee_percent": null,
  "billing_cycle_anchor": 1617124699,
  "billing_thresholds": null,
  "cancel_at": null,
  "cancel_at_period_end": false,
  "canceled_at": 1615324679,
  "collection_method": "charge_automatically",
  "created": 1614532699,
  "current_period_end": 1617124699,
  "current_period_start": 1614532699,
  "customer": "cus_J1wnE2tmLriEKp",
  "days_until_due": null,
  "default_payment_method": null,
  "default_source": null,
  "default_tax_rates": [],
  "discount": null,
  "ended_at": 1615324679,
  "items": {
    "object": "list",
    "data": [
      {
        "id": "si_J1wnvRdh6s7ZGt",
        "object": "subscription_item",
        "billing_thresholds": null,
        "created": 1614532700,
        "metadata": {},
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
        "quantity": 1,
        "subscription": "sub_J1wnT5X6ETnjJx",
        "tax_rates": []
      }
    ],
    "has_more": false,
    "url": "/v1/subscription_items?subscription=sub_J1wnT5X6ETnjJx"
  },
  "latest_invoice": "in_1IPsuNA8b46monEKwbJNOii7",
  "livemode": false,
  "metadata": {},
  "next_pending_invoice_item_invoice": null,
  "pause_collection": null,
  "pending_invoice_item_interval": null,
  "pending_setup_intent": null,
  "pending_update": null,
  "schedule": null,
  "start_date": 1614532699,
  "status": "trialing",
  "transfer_data": null,
  "trial_end": 1617124699,
  "trial_start": 1614532699
}

export const mockSubscriptionActive = {
  "id": "sub_J1wnT5X6ETnjJx",
  "object": "subscription",
  "application_fee_percent": null,
  "billing_cycle_anchor": 1617124699,
  "billing_thresholds": null,
  "cancel_at": null,
  "cancel_at_period_end": false,
  "canceled_at": 1615324679,
  "collection_method": "charge_automatically",
  "created": 1614532699,
  "current_period_end": 1617124699,
  "current_period_start": 1614532699,
  "customer": "cus_J1wnE2tmLriEKp",
  "days_until_due": null,
  "default_payment_method": null,
  "default_source": null,
  "default_tax_rates": [],
  "discount": null,
  "ended_at": 1615324679,
  "items": {
    "object": "list",
    "data": [
      {
        "id": "si_J1wnvRdh6s7ZGt",
        "object": "subscription_item",
        "billing_thresholds": null,
        "created": 1614532700,
        "metadata": {},
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
        "quantity": 1,
        "subscription": "sub_J1wnT5X6ETnjJx",
        "tax_rates": []
      }
    ],
    "has_more": false,
    "url": "/v1/subscription_items?subscription=sub_J1wnT5X6ETnjJx"
  },
  "latest_invoice": "in_1IPsuNA8b46monEKwbJNOii7",
  "livemode": false,
  "metadata": {},
  "next_pending_invoice_item_invoice": null,
  "pause_collection": null,
  "pending_invoice_item_interval": null,
  "pending_setup_intent": null,
  "pending_update": null,
  "schedule": null,
  "start_date": 1614532699,
  "status": "active",
  "transfer_data": null,
  "trial_end": 1617124699,
  "trial_start": 1614532699
}
