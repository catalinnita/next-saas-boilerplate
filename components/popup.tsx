import React from "react"
import { IoMdClose } from "react-icons/io"
import { useDispatch } from "react-redux"
import { Box, Button, Flex } from "rebass"
import { closeAllPopups } from "../state/slices/popups"

export const dataTestIds = {
  closeButton: "popup-close-button",
  contentContainer: "popup-content-container"
}

type Props = {
  showCloseButton?: boolean
}

export const Popup: React.FC<Props> = ({
  showCloseButton=true,
  children
}) => {
  const dispatch = useDispatch()

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Flex
        variant="popup" flexDirection="column">
        {showCloseButton &&
          <Button data-testid={dataTestIds.closeButton} variant="popupClose" onClick={() => { dispatch(closeAllPopups()) }}>
            <IoMdClose size="20px" />
          </Button>}
        <Box data-testid={dataTestIds.contentContainer} variant="popupContent">
          {children}
        </Box>
      </Flex>
    </Flex>
  )
}
