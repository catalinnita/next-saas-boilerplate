import { Stripe } from "stripe"

export const orderObjectById = (cardsList: Stripe.Card[]): Stripe.Card[] => Object.values(cardsList).sort((a: Stripe.Card, b: Stripe.Card) => a.id < b.id ? -1 : 1) as Stripe.Card[]
