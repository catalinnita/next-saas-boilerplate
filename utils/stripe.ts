import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import Stripe from "stripe";
import useSWR from "swr";

export const useStripe = (customerId: string): Record<string, any> => {
  const {
    data: customerData,
    error: customerError,
    mutate: mutateCustomer
  } = useSWR(customerId ? `/api/getCustomer/${customerId}` : null)

  const {
    data: subscriptionData,
    error: subcriptionError,
    mutate: mutateSubscription
  } = useSWR(customerId ? `/api/getSubscription/${customerId}` : null)

  const {
    data: paymentMethodsData,
    error: paymentMethodsError,
    mutate: mutatePaymentMethods
  } = useSWR(customerId ? `/api/getCards/${customerId}` : null)

  const setCustomer = async (email: string, cardDetails?: Stripe.Source.Card): Promise<void> => {
    const newCustomer = await fetch("/api/setCustomer/", {
      method: "POST",
      body: JSON.stringify({
        email,
        cardDetails
      })
    }).then(res => res.json())
    console.log(newCustomer)

    mutateCustomer(`/api/getCustomer/${customerId}`, { ...newCustomer })
    mutateSubscription(`/api/getSubscription/${customerId}`, { ...newSubscription })
    mutatePaymentMethods(`/api/getCards/${customerId}`, {...newCards})
  }

  const userStatus = (): string => {
    if (customerData?.id && subscriptionData?.id) {
      return subscriptionData?.status
    }

    if (customerData?.id && !subscriptionData) {
      return "no_subscription"
    }

    return Cookies.get("userStatus")
  }

  return {
    customer: customerData,
    subscription: subscriptionData,
    userStatus: userStatus(),
    userPayment: paymentMethodsData,
    setCustomer,
  }
}
