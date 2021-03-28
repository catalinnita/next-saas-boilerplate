import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next";
import appConfig from "../../../config/appConfig"

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY, { apiVersion: "2020-08-27" });

export default async function setCard(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method, body } = req
  const { customerId, cardToken } = JSON.parse(body)

  if (method !== "POST") {
    res.status(405).end("Method not allowed")
  }

  try {
    // create payment method
    const card = await stripe.customers.createSource(
      customerId,
      {
        source: cardToken
      }
    );

    res.end(JSON.stringify({ card }))

  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
