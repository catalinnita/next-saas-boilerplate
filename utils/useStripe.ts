import { useState, useEffect } from  "react"
import useSWR from "swr";
import appConfig from "../config/appConfig"
import { auth0User } from "./auth0";

export const getCustomer = async (email, callback) => {
  return useEffect(() => {
    const getCustomerCall = async () => {
      await fetch(`/api/customers/${email}`).then(res => {
        return res.json()
      }).then(res => {
        callback()
      })
    }
    getCustomerCall()
  }, [email]);
}

export const createSubscription = async (customerId: string, trialPeriodDays:number=appConfig.trialPeriod) => {
  return await fetch(`/api/subscriptions/${customerId}`, {
    method: "POST",
    body: JSON.stringify({
      trialPeriodDays,
    })
  }).then(res => {
    return res.json()
  })
}

export const removeSubscription = async (subscriptionId: string): Promise<void> => {
  return await fetch(`/api/subscriptions/`, {
    method: "DELETE",
    body: JSON.stringify({
      subscriptionId
    })
  }).then(res => {
    return res.json()
  })
}

export const useStripe = (user: auth0User): Record<string, any> => {
  const { email } = user // should be name

  const {
    data: customerData,
    error: customerError,
    mutate: mutateCustomer,
  } = useSWR(email ? `/api/customers/${email}` : null)

  const {
    data: cardsData,
    error: cardsError,
    mutate: mutateCards,
  } = useSWR(customerData?.customer?.id ? `/api/cards/${customerData?.customer?.id}` : null)

  const {
    data: invoicesData,
    error: invoicesError,
    mutate: mutateInvoices,
  } = useSWR(customerData?.customer?.id ? `/api/invoices/${customerData?.customer?.id}` : null)

  const {
    data: subscriptionData,
    error: subscriptionError,
    mutate: mutateSubscription,
  } = useSWR(customerData?.customer?.id ? `/api/subscriptions/${customerData?.customer?.id}` : null)

  // set default card
  const updateCustomer = async (customerId: string, sourceId: string): Promise<void> => {
    return await fetch(`/api/cards/${customerData?.customer?.id}`, {
      method: "PUT",
      body: JSON.stringify({
        sourceId
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      mutateCustomer({ ...res.customer })
    })
  }

  const createSubscription = async (customerId: string, trialPeriodDays:number=appConfig.trialPeriod): Promise<void> => {
    return await fetch(`/api/subscriptions/${customerData?.customer?.id}`, {
      method: "POST",
      body: JSON.stringify({
        trialPeriodDays,
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      mutateSubscription({ ...res.subscription })
    })
  }

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

      // set subscription
      const newSubscription = await createSubscription(newCustomer.customer.id)

    }
  }

  const removeCard = async (customerId: string, sourceId: string): Promise<void> => {
    return await fetch(`/api/cards/${customerData?.customer?.id}`, {
      method: "DELETE",
      body: JSON.stringify({
        sourceId
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      mutateCustomer({ ...res.customer })
    })
  }

  const attachCard = async (customerId: string, cardToken: string): Promise<void> => {
    return await fetch(`/api/cards/${customerData?.customer?.id}`, {
      method: "PUT",
      body: JSON.stringify({
        cardToken
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      mutateCustomer({ ...res.customer })
    })
  }

  const removeSubscription = async (subscriptionId: string): Promise<void> => {
    return await fetch(`/api/subscriptions/`, {
      method: "DELETE",
      body: JSON.stringify({
        subscriptionId
      })
    }).then(res => {
      return res.json()
    }).then(res => {
      mutateSubscription({ ...res.subscription })
    })
  }

  return {
    customer: customerData?.customer,
    updateCustomer,
    removeCard,
    attachCard,
    defaultCard: customerData?.customer?.default_source,
    paymentMethods: cardsData?.data,
    invoices: invoicesData?.data,
    userPayment: customerData?.customer?.default_source,
    subscription: subscriptionData?.subscription,
    createSubscription,
    removeSubscription,
    setCustomer,
  }
}
