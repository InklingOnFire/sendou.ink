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
  icon?: IconType
  disabled?: boolean
  sub?: boolean
}

const NavLink: React.FC<NavLinkProps> = ({
  linkTo,
  linkText,
  icon,
  onClick,
  disabled = false,
  sub = false,
}) => {
  const { grayWithShade } = useContext(MyThemeContext)

  if (linkTo)
    return (
      <Box my="1rem">
        <Link to={linkTo}>
          <Button
            icon={icon}
            variant="link"
            color={grayWithShade}
            ml={sub ? "1rem" : "0.4rem"}
            disabled={disabled}
            fontSize={sub ? "0.9rem" : "1rem"}
          >
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
        ml={sub ? "1rem" : "0.4rem"}
        disabled={disabled}
      >
        {linkText}
      </Button>
    </Box>
  )
}

export default NavLink
