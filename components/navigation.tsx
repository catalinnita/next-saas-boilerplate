import { useThemeUI } from 'theme-ui'
import React, { useState } from "react"
import { Box, Flex, Link, Text } from "rebass"
import Image from "next/image"
import { FaUserCircle } from "react-icons/fa"
import { BiNetworkChart } from "react-icons/bi"

export const dataTestIds = {
  container: "navigation-container"
}

export const Navigation: React.FC = () => {
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
  const accountMenuLink = {
    color: colors.text,
    fontSize: "12px",
    textDecoration: 'none',
    fontWeight: 400,
    padding: '12px 16px',
    minWidth: "200px",
    "&:hover": {
      bg: colors.primaryBg
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
        <Flex
          width={4 / 6}
          maxWidth="1080px"
          data-testid={dataTestIds.container}
        >
          <Link sx={{ ...linkStyling }} href="/dashboard">Dashboards</Link>
          <Link sx={{ ...linkStyling }} href="/campaigns">Campaigns</Link>
          <Link sx={{ ...linkStyling }} href="/reports">Reports</Link>
          <Link sx={{ ...linkStyling }} href="/users">Users</Link>
        </Flex>
        <Flex width={1 / 6} justifyContent="flex-end" pr="8px">
          <FaUserCircle color="white" cursor="pointer" size="20" onClick={() => { setShowAccountMenu(!showAccountMenu) }}/>
          <Box sx={{
              position: "absolute",
              backgroundColor: colors.white,
              border: `1px solid ${colors.grey200}`,
              borderRadius: "8px",
              marginTop: "32px",
              display: showAccountMenu ? "block" : "none",
              overflow: "hidden",
              boxShadow: "1px 1px 3px rgba(0,0,0,0.1)"
            }}
          >
            <Flex flexDirection="column">
              <Box sx={{...accountMenuLink, borderBottom: `1px solid ${colors.grey200}`}}>Catalin Nita's Account</Box>
              <Link sx={{...accountMenuLink}} href="/profile">Profile</Link>
              <Link sx={{...accountMenuLink}} href="/membership">Membership</Link>
              <Link sx={{...accountMenuLink, borderTop: `1px solid ${colors.grey200}`}} href="/api/logout">Logout</Link>
            </Flex>
          </Box>
        </Flex>

      </Flex>
    </Flex >
  )
}
