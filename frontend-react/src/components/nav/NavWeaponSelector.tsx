import React, { useContext } from "react"
import { weaponSelectOptions, weaponToLinkCode } from "../../utils/lists"
import { Box, Flex } from "@chakra-ui/core"
import WeaponImage from "../common/WeaponImage"
import MyThemeContext from "../../themeContext"
import { Link } from "@reach/router"
import { Weapon } from "../../types"

interface NavWeaponSelectorProps {
  linkTo?: string
  weaponCode?: string
  filter: string
}

const NavWeaponSelector: React.FC<NavWeaponSelectorProps> = ({
  linkTo = "/",
  filter,
}) => {
  const { grayWithShade } = useContext(MyThemeContext)

  const filterLower = filter.toLowerCase()
  const filteredOptions = weaponSelectOptions.reduce(
    (
      acc: { label: string; options: { label: Weapon; value: Weapon }[] }[],
      category
    ) => {
      const options = category.options.filter((option) =>
        option.value.toLowerCase().includes(filterLower)
      )
      if (!options.length) return acc
      return [...acc, { ...category, options }]
    },
    []
  )
  return (
    <Box>
      {filteredOptions.map((category) => (
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
              <Link key={wpn.value} to={linkTo + weaponToLinkCode[wpn.value]}>
                <WeaponImage
                  m="0.4rem"
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
