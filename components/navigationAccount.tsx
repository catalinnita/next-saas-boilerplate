import React from "react"
import { Box, Flex, Link } from "rebass"
import { useThemeUI } from "theme-ui"

export const NavigationAccount: React.FC = () => {
  const { theme } = useThemeUI()
  const { colors } = theme

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
    <Flex flexDirection="column">
      <Box sx={{...accountMenuLink, borderBottom: `1px solid ${colors.grey200}`}}>Catalin Nita's Account</Box>
      <Link sx={{...accountMenuLink}} href="/profile">Profile</Link>
      <Link sx={{...accountMenuLink}} href="/membership">Membership</Link>
      <Link sx={{...accountMenuLink, borderTop: `1px solid ${colors.grey200}`}} href="/api/account/logout">Logout</Link>
    </Flex>
  )
}
