import { Stripe } from "stripe";

export const orderObjectById = (cardsList:  Stripe.Card[]) => {
  return Object.values(cardsList).sort((a: Stripe.Card, b: Stripe.Card) => {
    return a.id < b.id ? -1 : 1;
  }) as Stripe.Card[]
}
