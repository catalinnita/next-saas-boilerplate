import React from "react"
import { Flex, Link } from "rebass"

export const dataTestIds = {
  container: "container"
}

export const NavigationTop: React.FC = () => {

  return (
    <Flex data-testid={dataTestIds.container}>
      <Link variant="topMenuLink" href="/dashboard">Dashboards</Link>
      <Link variant="topMenuLink" href="/campaigns">Campaigns</Link>
      <Link variant="topMenuLink" href="/reports">Reports</Link>
      <Link variant="topMenuLink" href="/users">Users</Link>
    </Flex>
  )
}
