import React from "react"
import { Box, Flex, Link } from "rebass"
import { useThemeUI } from "theme-ui"

export const dataTestIds = {
  container: "container"
}

export const NavigationAccount: React.FC = () => {
  const { theme } = useThemeUI()
  const { colors } = theme

  return (
    <Flex data-testid={dataTestIds.container} flexDirection="column">
      <Box variant="accountMenuLink" sx={{borderBottom: `1px solid ${colors.grey200}`}}>Catalin Nita's Account</Box>
      <Link variant="accountMenuLink" href="/profile">Profile</Link>
      <Link variant="accountMenuLink" href="/membership">Membership</Link>
      <Link variant="accountMenuLink" sx={{borderTop: `1px solid ${colors.grey200}`}} href="/api/account/logout">Logout</Link>
    </Flex>
  )
}
