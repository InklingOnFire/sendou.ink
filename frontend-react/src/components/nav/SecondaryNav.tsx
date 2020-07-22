import { Box } from "@chakra-ui/core"
import React, { ReactNode, useContext } from "react"
import MyThemeContext from "../../themeContext"
import "./Nav.css"

interface SecondaryNavProps {
  title: string
  children: ReactNode
}

const SecondaryNav: React.FC<SecondaryNavProps> = ({ title, children }) => {
  const { bgColor, themeColorWithShade } = useContext(MyThemeContext)
  return (
    <Box
      display={["none", null, "block"]}
      flexShrink={0}
      className="hide-scroll"
      top={0}
      position="sticky"
      as="nav"
      h="100vh"
      w="200px"
      overflowY="scroll"
      bg={bgColor}
      p="1rem 0.5rem"
    >
      <>
        <Box
          fontWeight="bold"
          fontSize="1.2rem"
          borderLeftColor={themeColorWithShade}
          borderLeftWidth="5px"
          pl="0.7rem"
          ml="0.3rem"
          mb="0.5rem"
        >
          {title}
        </Box>
        {children}
      </>
    </Box>
  )
}

export default SecondaryNav
