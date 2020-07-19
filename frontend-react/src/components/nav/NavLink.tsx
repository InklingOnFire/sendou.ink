import { Box, Flex } from "@chakra-ui/core"
import { Link } from "@reach/router"
import React, { useContext } from "react"
import MyThemeContext from "../../themeContext"
import Button from "../elements/Button"
import { IconType } from "react-icons/lib"

interface NavLinkProps {
  linkTo: string
  linkText: string
  icon: IconType
}

const NavLink: React.FC<NavLinkProps> = ({ linkTo, linkText, icon }) => {
  const { grayWithShade } = useContext(MyThemeContext)
  return (
    <Link to={linkTo}>
      <Button icon={icon} variant="link" color={grayWithShade} ml="0.25rem">
        {linkText}
      </Button>
    </Link>
  )
}

export default NavLink
