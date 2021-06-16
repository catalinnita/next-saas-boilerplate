import { useThemeUI } from 'theme-ui'
import React, { useState } from "react"
import { Box, Flex, Link, Text } from "rebass"
import Image from "next/image"
import { FaUserCircle } from "react-icons/fa"
import { BiNetworkChart } from "react-icons/bi"
import { NavigationTop } from "./navigationTop"
import { NavigationAccount } from './navigationAccount'

export const dataTestIds = {
  container: "navigation-container"
}

export const Header: React.FC = () => {
  const [ showAccountMenu, setShowAccountMenu ] = useState(false)
  const { theme } = useThemeUI()
  const { colors } = theme
  const linkStyling = {
    fontFamily: "Rubik",
    color: colors.white,
    textDecoration: 'none',
    fontWeight: '400',
    mx: '18px',
    ":hover": {
      opacity: 0.8
    }
  }

  return (
    <Flex
      p="24px"
      fontSize={1}
      backgroundColor={colors.primary}
      justifyContent="space-around"
    >
      <Flex
        width="100%"
        justifyContent="space-between"
      >
        <Flex width={1/6}>
          <BiNetworkChart size="20px" color={colors.white.toString()}/>
          <Text sx={{...linkStyling}} fontWeight="400" ml="4px">ScrambledData</Text>
        </Flex>
        <Box
          width={4 / 6}
          maxWidth="1080px"
          data-testid={dataTestIds.container}
        >
          <NavigationTop />
        </Box>
        <Flex width={1 / 6} justifyContent="flex-end" pr="8px">
          <FaUserCircle color="white" cursor="pointer" size="20" onClick={() => { setShowAccountMenu(!showAccountMenu) }}/>
          <Box
            variant="dropDown"
            display={showAccountMenu ? "block" : "none"}
          >
            <NavigationAccount />
          </Box>
        </Flex>

      </Flex>
    </Flex >
  )
}
