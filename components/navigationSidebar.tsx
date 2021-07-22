import React from "react"
import { Box, Flex, Heading, Link } from "rebass"

export const dataTestIds = {
  container: "container"
}

export const NavigationSidebar: React.FC = () => {
  return (
    <Box data-testid={dataTestIds.container} variant="menuStyle">
       <Flex justifyContent="space-between" alignItems="center"
          backgroundColor="white"
          p="12px 16px"
         >
        <Heading as="h3">Account</Heading>
        </Flex>
      <Link variant="sidebarMenuLink" href="/profile">Profile</Link>
      <Link variant="sidebarMenuLink" href="/membership">Membership</Link>
      <Link variant="sidebarMenuLink" href="/projects">Projects</Link>
    </Box>
  )
}
