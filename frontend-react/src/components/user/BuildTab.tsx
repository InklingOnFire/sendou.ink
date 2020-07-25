import { Box } from "@chakra-ui/core"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Ability, Build, ClothingGear, HeadGear, ShoesGear } from "../../types"
import BuildCard from "../builds/BuildCard"
import Alert from "../elements/Alert"
import BuildFormModal from "./BuildFormModal"

interface BuildTabProps {
  builds: Build[]
  canModifyBuilds: boolean
  unlimitedBuilds: boolean
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

type ExistingGearObject = Record<
  Partial<HeadGear | ClothingGear | ShoesGear>,
  Ability[]
>

const buildsReducer = (acc: ExistingGearObject, cur: Build) => {
  if (cur.headgearItem) {
    acc[cur.headgearItem] = [...cur.headgear]
  }
  if (cur.clothingItem) {
    acc[cur.clothingItem] = [...cur.clothing]
  }
  if (cur.shoesItem) {
    acc[cur.shoesItem] = [...cur.shoes]
  }
  return acc
}

const BuildTab: React.FC<BuildTabProps> = ({
  builds,
  canModifyBuilds,
  unlimitedBuilds,
  showModal,
  setShowModal,
}) => {
  const [buildBeingEdited, setBuildBeingEdited] = useState<Build | null>(null)
  const { t } = useTranslation()

  const existingGear = builds
    ? builds.reduce(buildsReducer, {} as ExistingGearObject)
    : ({} as ExistingGearObject)

  const canAddBuilds = builds.length < 100 || unlimitedBuilds

  return (
    <>
      {showModal && (
        <BuildFormModal
          existingGear={existingGear}
          closeModal={() => {
            setShowModal(false)
            setBuildBeingEdited(null)
          }}
          buildBeingEdited={buildBeingEdited}
        />
      )}
      {canModifyBuilds && !canAddBuilds && (
        <Alert status="info">{t("users;tooManyBuilds")}</Alert>
      )}
      <Box display="flex" flexWrap="wrap" mt="1em">
        {builds.map((build) => (
          <BuildCard
            canModify={canModifyBuilds}
            setBuildBeingEdited={(build: Build) => {
              setBuildBeingEdited(build)
              setShowModal(true)
            }}
            key={build.id}
            build={build}
            m="0.5em"
          />
        ))}
      </Box>
    </>
  )
}

export default BuildTab
