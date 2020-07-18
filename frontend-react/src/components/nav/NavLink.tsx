import { Box, Flex } from "@chakra-ui/core"
import { Link } from "@reach/router"
import React, { useContext } from "react"
import MyThemeContext from "../../themeContext"

interface NavLinkProps {
  linkTo: string
  linkText: string
  icon: JSX.Element
}

const NavLink: React.FC<NavLinkProps> = ({ linkTo, linkText, icon }) => {
  const { grayWithShade } = useContext(MyThemeContext)
  return (
    <Link to={linkTo}>
      <Flex alignItems="center" color={grayWithShade} fontWeight="bold">
        <Box mr="0.3rem">{icon}</Box> {linkText}
      </Flex>
    </Link>
  )
}

export default NavLink
