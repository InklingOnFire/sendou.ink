import { Box, Flex } from "@chakra-ui/core"
import React, { ReactNode } from "react"
import SecondaryNav from "../nav/SecondaryNav"

interface LayoutProps {
  title?: string
  secondaryNav: ReactNode
  page: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ title, secondaryNav, page }) => {
  return (
    <Flex>
      <SecondaryNav title={title}>{secondaryNav}</SecondaryNav>
      <Box px={8} py={4} maxW="64rem" flexGrow={1} mx="auto">
        {page}
      </Box>
    </Flex>
  )
}

export default Layout
