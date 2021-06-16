import React from "react"
import { Flex, Link } from "rebass"
import { useThemeUI } from "theme-ui"

export const NavigationTop: React.FC = () => {
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
    <Flex>
      <Link sx={{ ...linkStyling }} href="/dashboard">Dashboards</Link>
      <Link sx={{ ...linkStyling }} href="/campaigns">Campaigns</Link>
      <Link sx={{ ...linkStyling }} href="/reports">Reports</Link>
      <Link sx={{ ...linkStyling }} href="/users">Users</Link>
    </Flex>
  )
}
