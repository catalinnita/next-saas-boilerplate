import { useThemeUI } from 'theme-ui'
import React, { useState } from "react"
import { Box, Flex } from "rebass"
import { FaUserCircle } from "react-icons/fa"
import { BiNetworkChart } from "react-icons/bi"
import { NavigationTop } from "./navigationTop"
import { NavigationAccount } from './navigationAccount'

export const dataTestIds = {
  container: "navigation-container",
  accountIcon: "header-account-icon",
  accountMenuContainer: "header-account-menu-container"
}

export const Header: React.FC = () => {
  const [ showAccountMenu, setShowAccountMenu ] = useState(false)
  const { theme } = useThemeUI()
  const { colors } = theme

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
          <BiNetworkChart size="20px" />
          <Box variant="topMenuLink" ml="4px">ScrambledData</Box>
        </Flex>
        <Box
          width={4 / 6}
          maxWidth="1080px"
          data-testid={dataTestIds.container}
        >
          <NavigationTop />
        </Box>
        <Flex width={1 / 6} justifyContent="flex-end" pr="8px">
          <FaUserCircle data-testid={dataTestIds.accountIcon} color="white" cursor="pointer" size="20" onClick={() => { setShowAccountMenu(!showAccountMenu) }}/>
          <Box
            data-testid={dataTestIds.accountMenuContainer}
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
