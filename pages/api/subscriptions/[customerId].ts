import { stripe } from "../../../utils/stripe"
import { NextApiRequest, NextApiResponse } from "next"
import config from "../../../config/appConfig"

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    method,
    body,
    query: { customerId },
  } = req

  const { trialPeriodDays } = body && JSON.parse(body)

  if (method !== "GET" && method !== "POST") {
    res.status(405).end("Method not allowed")
  }

  try {

    // get last subscription for a customer
    if (method === 'GET') {
      const subscription = await stripe.subscriptions.list({
        customer: customerId.toString(),
        status: "all",
        limit: 1,
      })
      res.end(JSON.stringify(subscription.data[0]))
    }

    // create and add a new subscription to a customer
    if (method === 'POST') {
      const subscription = await stripe.subscriptions.create({
        customer: customerId.toString(),
        items: [{ price: config.priceId }],
        trial_period_days: trialPeriodDays,
      });

      res.end(JSON.stringify(subscription))
    }

  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message)
  }
}
