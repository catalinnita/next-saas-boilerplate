import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY, { apiVersion: "2020-08-27" });

export default async function getCustomer(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const {
    query: { customerId },
  } = req

  try {
    const customer = await stripe.customers.retrieve( customerId.toString() )
    res.end(JSON.stringify(customer))
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
