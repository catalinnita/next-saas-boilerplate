import React from "react"
import { useThemeUI } from 'theme-ui'
import { Box, Flex, Heading, Link } from "rebass"
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript"

export const NavigationSidebar: React.FC = () => {
  const { theme } = useThemeUI()
  const { colors } = theme

  const sidebarMenuLink = {
    bg: colors.white,
    fontWeight: 400,
    color: colors.text,
    textDecoration: 'none',
    p: "12px 16px",
    fontSize: "12px",
    "&:hover": {
      bg: colors.grey
    }
  }
  return (
    <Box variant="menuStyle">
       <Flex justifyContent="space-between" alignItems="center"
          backgroundColor="white"
          p="12px 16px"
         >
        <Heading as="h3" fontSize="18px">Account</Heading>
        </Flex>
      <Link sx={{...sidebarMenuLink}} href="/profile">Profile</Link>
      <Link sx={{...sidebarMenuLink}} href="/membership">Membership</Link>
    </Box>
  )
}
