import { useState } from  "react"
import useSWR from "swr";
import { auth0User } from "./auth0";

export const useStripe = (user: auth0User, setUser: (userDetails: auth0User) => void): Record<string, any> => {
  const { email } = user
  const { customerId } = user.user_metadata

  console.log(customerId)

  const {
    data: customerData,
    error: customerError,
    mutate: mutateCustomer
  } = useSWR(customerId ? `/api/getCustomer/${customerId}` : null)

  const [customer, setCustomer] = useState(customerData)

  const createCustomer = async (): Promise<void> => {
    console.log({ customerId })
    // prevent customer duplication
    if (customerId) return

    // create customer in stripe
    const { customer: newCustomer } = await fetch("/api/setCustomer", {
      method: "POST",
      body: JSON.stringify({
        email,
        // cardDetails
      })
    }).then(res => res.json())
    console.log({ newCustomer })
    // mutateCustomer(`/api/getCustomer/${customerId}`, { ...newCustomer })

    // update the auth0 with the new customerId
    setUser({
      ...user,
      user_metadata: {
        customerId: newCustomer.id,
      }
    })

    // set customer state
    setCustomer(newCustomer)

  }

  return {
    user,
    customer,
    createCustomer,
  }
}
