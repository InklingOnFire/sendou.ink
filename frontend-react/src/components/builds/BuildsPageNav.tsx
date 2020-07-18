import { Box } from "@chakra-ui/core"
import React, { useState } from "react"
import { FiPlus } from "react-icons/fi"
import NavLink from "../nav/NavLink"
import NavSearch from "../nav/NavSearch"
import NavWeaponSelector from "../nav/NavWeaponSelector"

const BuildsPageNav: React.FC = () => {
  const [filter, setFilter] = useState("")
  return (
    <>
      <Box mt="1rem" mb="2rem">
        <NavLink icon={<FiPlus />} linkTo="/" linkText="New build" />
      </Box>
      <NavSearch value={filter} setValue={(value) => setFilter(value)} />
      <NavWeaponSelector linkTo="/builds/" filter={filter} />
    </>
  )
}

export default BuildsPageNav
