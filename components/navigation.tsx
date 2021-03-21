import React from "react"
import { Flex, Link } from "rebass"

export const dataTestIds = {
  container: "navigation-container"
}

export const Navigation: React.FC = () => {
  return (
    <Flex flexDirection="column" data-testid={dataTestIds.container} >
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/membership">Membership</Link>
      <Link href="/billing">Billing</Link>
    </Flex>
  )
}
