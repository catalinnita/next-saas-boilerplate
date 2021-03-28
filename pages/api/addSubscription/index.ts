import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY, { apiVersion: "2020-08-27" });

export default async function addSubscription(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method, body } = req
  const { customerId, priceId, trialPeriodDays } = JSON.parse(body)

  if (method !== "POST") {
    res.status(405).end("Method not allowed")
  }

  try {
    // create customer
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId
        }
      ],
      trial_period_days: trialPeriodDays,
    });

    res.status(200).end(JSON.stringify({ subscription }))

  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
