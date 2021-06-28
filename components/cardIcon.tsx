import React from "react"
import Image from "next/image"

export const dataTestIds = {
  cardImage: "card-image"
}

type Props = {
  name: string
}

export const CardIcon: React.FC<Props> = ({ name }) => {
  const cardTypes = ["visa", "mastercard", "american express", "discover"]
  const cardName = cardTypes.includes(name.toLowerCase()) ? name.toLowerCase().replace(" ", "-") : "default"
  return <Image data-testid={`${dataTestIds.cardImage}-${cardName}`} width={30} height={18} src={`/svg/${cardName}.svg`} alt={name.toString()} layout="fixed" />
}
