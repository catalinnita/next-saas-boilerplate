import React, { useEffect } from "react"
import { Button, Heading } from "rebass"
import { useDispatch } from "react-redux"
import { showPopup } from "../state/slices/popups"
import { RowCard } from "./rowCard"
import { useStateSelector } from "../utils/useStateSelector"
import { Block } from "./block"
import { getProjects } from "../state/slices/projects"

export const dataTestIds = {
  card: "payment-methods-card",
  addCardButton: "add-card-button",
  cardRow: "card-row",
}

export const BlockProjects: React.FC = () => {
  const dispatch = useDispatch()
  const { projectsList } = useStateSelector("projects")

  const canAddMoreProjects = projectsList.length < 5

  useEffect(() => {
    dispatch(getProjects())
  })

  if (!projectsList.length) {
    return null
  }

  return (
    <Block
      gridTemplateColumns={[5, 5, 25, 55, 10]}
      headerLeft={<Heading as="h3">Payment methods</Heading>}
      headerRight={
        canAddMoreProjects && (
          <Button
            data-testid={dataTestIds.addCardButton}
            variant="primarySmall"
            onClick={(): void => {
              dispatch(
                showPopup({
                  popup: "paymentMethod",
                })
              )
            }}
          >
            Add project
          </Button>
        )
      }
    >
      {projectsList.map((card) => (
        <RowCard key={card.id} card={card} />
      ))}
    </Block>
  )
}
