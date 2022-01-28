import { NextApiRequest, NextApiResponse } from "next"
import { stripe } from "../../../utils/stripe"

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { method, body } = req

  const { subscriptionId } = body && JSON.parse(body)

  if (method !== "DELETE") {
    res.status(405).end("Method not allowed")
  }

  try {
    const subscription = await stripe.subscriptions.del(subscriptionId.toString(), {
      invoice_now: true,
      prorate: true,
    })
    res.end(JSON.stringify(subscription))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
