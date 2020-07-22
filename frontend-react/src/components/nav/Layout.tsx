import { Box, Flex } from "@chakra-ui/core"
import React, { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import SecondaryNav from "../nav/SecondaryNav"

interface LayoutProps {
  titleKey: string
  secondaryNav: ReactNode
  page: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ titleKey, secondaryNav, page }) => {
  const { t } = useTranslation()
  return (
    <Flex>
      <SecondaryNav title={t(`navigation;${titleKey}`)}>
        {secondaryNav}
      </SecondaryNav>
      <Box px={8} py={4} maxW="64rem" flexGrow={1} mx="auto">
        {page}
      </Box>
    </Flex>
  )
}

export default Layout
