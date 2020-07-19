import { Link } from "@reach/router"
import React, { useContext } from "react"
import { IconType } from "react-icons/lib"
import MyThemeContext from "../../themeContext"
import Button from "../elements/Button"

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
