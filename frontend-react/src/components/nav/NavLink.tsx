import { Link } from "@reach/router"
import React, { useContext } from "react"
import { IconType } from "react-icons/lib"
import MyThemeContext from "../../themeContext"
import Button from "../elements/Button"
import { Box } from "@chakra-ui/core"

interface NavLinkProps {
  linkTo?: string
  onClick?: () => void
  linkText: string
  icon: IconType
}

const NavLink: React.FC<NavLinkProps> = ({
  linkTo,
  linkText,
  icon,
  onClick,
}) => {
  const { grayWithShade } = useContext(MyThemeContext)

  if (linkTo)
    return (
      <Box my="1rem">
        <Link to={linkTo}>
          <Button icon={icon} variant="link" color={grayWithShade} ml="0.25rem">
            {linkText}
          </Button>
        </Link>
      </Box>
    )

  return (
    <Box my="1rem">
      <Button
        onClick={onClick}
        icon={icon}
        variant="link"
        color={grayWithShade}
        ml="0.25rem"
      >
        {linkText}
      </Button>
    </Box>
  )
}

export default NavLink
