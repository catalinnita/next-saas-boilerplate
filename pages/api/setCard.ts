import Stripe from "stripe"
import { NextApiRequest, NextApiResponse } from "next";
import { appConfig } from "../../config/appConfig"

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY, { apiVersion: "2020-08-27" });

export default async function setCard(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method, body } = req
  const { email } = JSON.parse(body)

  if (method !== "POST") {
    res.status(405).end("Method not allowed")
  }

  try {
    // create payment method -- if available
    // create customer
    const customer = await stripe.customers.create({
      email
    });
    // update auth0
    // create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      trial_period_days: appConfig.trialPeriod,
      items: [
        { price: appConfig.priceId },
      ],
    });

    res.status(200).end({
      customer,
      subscription
    })

  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
