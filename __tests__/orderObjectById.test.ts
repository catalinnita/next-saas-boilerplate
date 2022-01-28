import { Stripe } from "stripe"
import mockCards from "./_mockCards"
import { orderObjectById } from "../utils/orderObjectById"

it("orders the list by id property", () => {
  const orderedList = orderObjectById(mockCards as Stripe.Card[])

  expect(orderedList[0].id).toBe("card_1IXUKjA8b46monEK0mD6CnJb")
  expect(orderedList[1].id).toBe("card_1IXUKjA8b46monEK0mD6CnJc")
  expect(orderedList[2].id).toBe("card_1IXUKjA8b46monEK0mD6CnJd")
  expect(orderedList[3].id).toBe("card_1IXUKjA8b46monEK0mD6CnJe")
  expect(orderedList[4].id).toBe("card_1IXUKjA8b46monEK0mD6CnJf")
})
