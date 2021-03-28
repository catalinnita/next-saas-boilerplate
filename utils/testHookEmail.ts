import { useState } from  "react"
import useSWR from "swr";
import appConfig from "../config/appConfig"
import { auth0User } from "./auth0";

export const useStripe = (user: auth0User): Record<string, any> => {
  const { email } = user

  const {
    data: customerData,
    error: customerError,
    mutate: mutateCustomer,
  } = useSWR(email ? `/api/getCustomer/${email}` : null)

  const {
    data: subscriptionData,
    error: subscriptionError,
    mutate: mutateSubscription,
  } = useSWR(customerData?.customer.id ? `/api/getSubscription/${customerData.customer.id}` : null)

  const setCustomer = async (cardToken): Promise<void> => {
    // create customer in stripe just if none exists yet
    if (customerData && !customerData.customer) {

      // add the customer
      const newCustomer = await fetch("/api/addCustomer", {
        method: "POST",
        body: JSON.stringify({
          email,
        })
      }).then(res => res.json())

      // create payment method
      if(cardToken) {
        const newCard = await fetch("/api/addCard", {
          method: "POST",
          body: JSON.stringify({
            customerId: customerData.id,
            cardToken,
          })
        }).then(res => res.json())
      }

      // mutateCustomer(`/api/getCustomer/${email}`, { ...newCustomer })

      console.log({ newCustomer })

      // set subscription
      const newSubscription = await fetch("/api/addSubscription", {
        method: "POST",
        body: JSON.stringify({
          customerId: newCustomer.customer.id,
          priceId: appConfig.priceId,
          trialPeriodDays: appConfig.trialPeriod
        })
      }).then(res => res.json())



    }
  }

  return {
    customer: customerData?.customer,
    subscription: subscriptionData?.subscription,
    setCustomer,
  }
}
