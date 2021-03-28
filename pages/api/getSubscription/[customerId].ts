import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY, { apiVersion: "2020-08-27" });

export default async function getSubscription(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const {
    query: { customerId },
  } = req

  try {
    const subscription = await stripe.subscriptions.list({
      customer: customerId.toString(),
      limit: 1,
    })
    res.end(JSON.stringify({ subscription: subscription.data[0] }))
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message)
  }
}
