import { Box } from "@chakra-ui/core"
import React, { useState } from "react"
import { FiPlus } from "react-icons/fi"
import NavLink from "../nav/NavLink"
import NavSearch from "../nav/NavSearch"
import NavWeaponSelector from "../nav/NavWeaponSelector"
import { useTranslation } from "react-i18next"
import { useQuery } from "@apollo/client"
import { USER } from "../../graphql/queries/user"
import { UserData } from "../../types"

const BuildsPageNav: React.FC = () => {
  const { t } = useTranslation()
  const [filter, setFilter] = useState("")
  const { data } = useQuery<UserData>(USER)
  return (
    <>
      {data?.user && (
        <Box mt="1rem" mb="1rem">
          <NavLink
            icon={FiPlus}
            linkTo={`/u/${data.user.discord_id}?build=new`}
            linkText={t("builds;New build")}
          />
        </Box>
      )}
      <NavSearch
        value={filter}
        setValue={(value) => setFilter(value)}
        mb="0.5rem"
      />
      <NavWeaponSelector linkTo="/builds/" filter={filter} />
    </>
  )
}

export default BuildsPageNav
