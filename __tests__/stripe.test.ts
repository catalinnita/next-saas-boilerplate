import { stripe } from "../utils/stripe"
import Stripe from "stripe"

it("initializes stripe", () => {
  expect(stripe).toBeInstanceOf(Stripe)
})
