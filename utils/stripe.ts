import Stripe from "stripe"

export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_KEY,
  {
    apiVersion: "2020-08-27"
  }
)
