import { Flex, Image } from "@chakra-ui/core"
import React from "react"
import { useTranslation } from "react-i18next"
import { FiEdit2, FiPlus } from "react-icons/fi"
import cb from "../../assets/cb.png"
import rm from "../../assets/rm.png"
import sz from "../../assets/sz.png"
import tc from "../../assets/tc.png"
import { Weapon } from "../../types"
import SmallHeader from "../common/SmallHeader"
import WeaponImage from "../common/WeaponImage"
import NavLink from "../nav/NavLink"

const MODE_IMAGES = new Map([
  ["SZ", sz],
  ["TC", tc],
  ["RM", rm],
  ["CB", cb],
])

interface UserPageNavProps {
  editProfile: () => void
  newBuild: () => void
  canEdit: boolean
  buildCounts?: [Weapon, number][]
  placementCounts?: ["SZ" | "TC" | "RM" | "CB", number][]
}

const UserPageNav: React.FC<UserPageNavProps> = ({
  editProfile,
  newBuild,
  canEdit,
  buildCounts,
  placementCounts,
}) => {
  const { t } = useTranslation()
  return (
    <>
      {canEdit && (
        <NavLink linkText="Edit profile" icon={FiEdit2} onClick={editProfile} />
      )}
      {canEdit && (
        <NavLink linkText="New build" icon={FiPlus} onClick={newBuild} />
      )}
      {buildCounts && (
        <>
          <SmallHeader>{t("navigation;Builds")}</SmallHeader>
          <Flex flexWrap="wrap">
            {buildCounts.map(([weapon, count]) => (
              <Flex key={weapon} alignItems="center" m={2}>
                <WeaponImage weaponSize="SMALL" englishName={weapon} />
                {count > 1 && <SmallHeader py={0}>x {count}</SmallHeader>}
              </Flex>
            ))}
          </Flex>
        </>
      )}
      {placementCounts && (
        <>
          <SmallHeader>{t("users;X Rank Top 500")}</SmallHeader>
          <Flex flexWrap="wrap">
            {placementCounts.map(([mode, count]) => (
              <Flex key={mode} alignItems="center" m={2}>
                <Image w="32px" h="32px" src={MODE_IMAGES.get(mode)} />
                <SmallHeader py={0}>x {count}</SmallHeader>
              </Flex>
            ))}
          </Flex>
        </>
      )}
    </>
  )
}

export default UserPageNav
