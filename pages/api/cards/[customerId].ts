import { NextApiRequest, NextApiResponse } from "next"
import { stripe } from "../../../utils/stripe"

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    method,
    body,
    query: { customerId },
  } = req

  const { cardToken, sourceId } = body && JSON.parse(body)

  if (method !== "GET" && method !== "PUT" && method !== "DELETE") {
    res.status(405).end("Method not allowed")
  }

  try {
    // get cards list
    if (method === "GET") {
      const cards = await stripe.customers.listSources(customerId.toString(), {
        object: "card",
        limit: 5,
      })
      res.end(JSON.stringify(cards.data))
    }

    // attach created card
    if (method === "PUT" && cardToken) {
      const card = await stripe.customers.createSource(customerId.toString(), { source: cardToken })
      res.end(JSON.stringify(card))
    }

    // set default card
    if (method === "PUT" && sourceId) {
      const customer = await stripe.customers.update(customerId.toString(), {
        default_source: sourceId,
      })
      res.end(JSON.stringify(customer))
    }

    // remove card
    if (method === "DELETE" && sourceId) {
      const card = await stripe.customers.deleteSource(customerId.toString(), sourceId)
      res.end(JSON.stringify(card))
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
