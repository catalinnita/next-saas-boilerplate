import React, { useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { useDispatch } from "react-redux"
import { Box, Button, Flex } from "rebass"
import { closeAllPopups } from "../state/slices/popups"
import { Transition } from "react-transition-group"


type Props = {
}

export const Popup: React.FC<Props> = ({ children }) => {
  const [inProp, setInProp] = useState(false);

  const dispatch = useDispatch()
  const defaultStyle = {
    transition: "opacity 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
    opacity: 0,
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  }

  const closePopup = () => {
    setInProp(false)
    setTimeout(() => {
      dispatch(closeAllPopups())
    }, 300)
  }

  useEffect(() => {
    setInProp(true)
  }, []);

  return (
    <Transition in={inProp} timeout={500}>
      {state => (
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Flex style={{
              ...defaultStyle,
              ...transitionStyles[state]
          }}
            variant="popup" flexDirection="column">
            <Button variant="popupClose" onClick={() => { closePopup() }}>
              <IoMdClose size="20px" />
            </Button>
            <Box variant="popupContent">
              {children}
            </Box>
          </Flex>
        </Flex>)}
    </Transition>
  )
}
