import React, { useContext } from "react"
import { weaponSelectOptions, weaponToLinkCode } from "../../utils/lists"
import { Box, Flex } from "@chakra-ui/core"
import WeaponImage from "../common/WeaponImage"
import MyThemeContext from "../../themeContext"
import { Link } from "@reach/router"

interface NavWeaponSelectorProps {
  linkTo?: string
}

const NavWeaponSelector: React.FC<NavWeaponSelectorProps> = ({
  linkTo = "/",
}) => {
  const { grayWithShade } = useContext(MyThemeContext)
  return (
    <Box>
      {weaponSelectOptions.map((category) => (
        <React.Fragment key={category.label}>
          <Box
            textTransform="uppercase"
            fontSize="75%"
            fontWeight={500}
            color={grayWithShade}
            py="0.5rem"
            ml="0.4rem"
          >
            {category.label}
          </Box>
          <Flex wrap="wrap">
            {category.options.map((wpn) => (
              <Link to={linkTo + weaponToLinkCode[wpn.value]}>
                <WeaponImage
                  m="0.4rem"
                  key={wpn.value}
                  englishName={wpn.value}
                  weaponSize="SMALL"
                />
              </Link>
            ))}
          </Flex>
        </React.Fragment>
      ))}
    </Box>
  )
}

export default NavWeaponSelector
