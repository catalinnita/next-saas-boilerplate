import Stripe from "stripe"
import { stripe } from "../utils/stripe"

it("initializes stripe", () => {
  expect(stripe).toBeInstanceOf(Stripe)
})
