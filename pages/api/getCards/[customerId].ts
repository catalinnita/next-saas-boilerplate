import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY, { apiVersion: "2020-08-27" });

export default async function getCards(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const {
    query: { customerId },
  } = req

  try {
    const cards = await stripe.customers.listSources( customerId.toString(), {object: "card", limit: 3} )
    res.end(JSON.stringify(cards))
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
