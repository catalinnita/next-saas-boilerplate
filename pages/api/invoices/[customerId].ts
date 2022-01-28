import { NextApiRequest, NextApiResponse } from "next"
import { stripe } from "../../../utils/stripe"

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    method,
    query: { customerId, lastObject },
  } = req

  if (method !== "GET") {
    res.status(405).end("Method not allowed")
  }

  try {
    const extraParams = lastObject ? { starting_after: lastObject.toString() } : {}
    const invoices = await stripe.invoices.list({
      customer: customerId.toString(),
      ...extraParams,
    })
    res.end(JSON.stringify(invoices))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    res.status(error.status || 400).end(JSON.stringify(error))
  }
}
