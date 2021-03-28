import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY, { apiVersion: "2020-08-27" });

export default async function addCustomer(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method, body } = req
  const { email } = JSON.parse(body)

  if (method !== "POST") {
    res.status(405).end("Method not allowed")
  }

  try {
    // create customer
    const customer = await stripe.customers.create({
      email
    });

    res.status(200).end(JSON.stringify({ customer }))

  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
