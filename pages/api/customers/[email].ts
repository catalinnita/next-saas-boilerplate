import { stripe } from "../../../utils/stripe"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    method,
    query: { email },
  } = req

  if (method !== "GET" && method !== "POST" ) {
    res.status(405).end("Method not allowed")
  }

  try {

    // get customer by email
    if (method === 'GET') {
      const customer = await stripe.customers.list({
        email: email.toString()
      })
      res.end(JSON.stringify(customer.data[0]))
    }

    // create a new customer
    if (method === 'POST') {
      const customer = await stripe.customers.create({
        email: email.toString()
      });
      res.end(JSON.stringify({ customer }))
    }

  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(JSON.stringify(error));
  }
}
