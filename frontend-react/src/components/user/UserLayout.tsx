import { useQuery } from "@apollo/client"
import { RouteComponentProps, useLocation } from "@reach/router"
import React, { useState, useEffect } from "react"
import { PLAYER_INFO } from "../../graphql/queries/playerInfo"
import { SEARCH_FOR_BUILDS } from "../../graphql/queries/searchForBuilds"
import {
  SearchForUserData,
  SearchForUserVars,
  SEARCH_FOR_USER,
} from "../../graphql/queries/searchForUser"
import { USER } from "../../graphql/queries/user"
import {
  PlayerInfoData,
  PlayerInfoVars,
  SearchForBuildsData,
  SearchForBuildsVars,
  UserData,
  Weapon,
} from "../../types"
import { weapons } from "../../utils/lists"
import Layout from "../nav/Layout"
import UserPage from "./UserPage"
import UserPageNav from "./UserPageNav"
import { useTranslation } from "react-i18next"

interface UserLayoutProps {
  id?: string
}

const MODES = ["SZ", "SZ", "TC", "RM", "CB"] as const

const UserLayout: React.FC<RouteComponentProps & UserLayoutProps> = ({
  id,
}) => {
  const { t } = useTranslation()
  const location = useLocation()
  const [showEditUserModal, setShowEditUserModal] = useState(false)
  const [showBuildModal, setShowBuildModal] = useState(false)

  const { data } = useQuery<SearchForUserData, SearchForUserVars>(
    SEARCH_FOR_USER,
    {
      variables: isNaN(id as any) ? { custom_url: id } : { discord_id: id },
    }
  )

  const { data: userData } = useQuery<UserData>(USER)

  const { data: buildsData } = useQuery<
    SearchForBuildsData,
    SearchForBuildsVars
  >(SEARCH_FOR_BUILDS, {
    variables: { discord_id: data?.searchForUser?.discord_id as any },
    skip: !data || !data.searchForUser,
  })

  const { data: playerData } = useQuery<PlayerInfoData, PlayerInfoVars>(
    PLAYER_INFO,
    {
      variables: { twitter: data?.searchForUser?.twitter_name as any },
      skip: !data || !data.searchForUser || !data.searchForUser.twitter_name,
    }
  )

  useEffect(() => {
    if (!data || !userData) return
    if (data.searchForUser?.discord_id !== userData.user?.discord_id) return
    if (new URLSearchParams(location.search).get("build") !== "new") return

    setShowBuildModal(true)
  }, [data, location.search, userData])

  return (
    <Layout
      title={t("navigation;User's Page")}
      secondaryNav={
        <UserPageNav
          editProfile={() => setShowEditUserModal(true)}
          newBuild={() => setShowBuildModal(true)}
          canEdit={
            !!userData?.user?.discord_id &&
            userData?.user?.discord_id === data?.searchForUser?.discord_id
          }
          buildCounts={buildsData?.searchForBuilds
            .reduce((acc: [Weapon, number][], cur) => {
              let found = false
              for (const weaponObj of acc) {
                if (weaponObj[0] === cur.weapon) {
                  weaponObj[1] = weaponObj[1] + 1
                  found = true
                  break
                }
              }

              if (!found) acc.push([cur.weapon, 1])
              return acc
            }, [])
            .sort((aTuple, bTuple) => {
              const weaponPool = data?.searchForUser?.weapons ?? []
              const a = aTuple[0]
              const b = bTuple[0]
              if (weaponPool) {
                if (weaponPool.includes(a) && weaponPool.includes(b)) {
                  return weaponPool.indexOf(a) - weaponPool.indexOf(b)
                }
                const poolComparision =
                  weaponPool.indexOf(b) - weaponPool.indexOf(a)

                if (poolComparision !== 0) return poolComparision
              }
              return weapons.indexOf(a) - weapons.indexOf(b)
            })}
          placementCounts={playerData?.playerInfo?.placements
            .reduce((acc: ["SZ" | "TC" | "RM" | "CB", number][], cur) => {
              let found = false
              for (const placementObj of acc) {
                if (placementObj[0] === MODES[cur.mode]) {
                  placementObj[1] = placementObj[1] + 1
                  found = true
                  break
                }
              }

              if (!found) acc.push([MODES[cur.mode], 1])
              return acc
            }, [])
            .sort((a, b) => MODES.indexOf(a[0]) - MODES.indexOf(b[0]))}
        />
      }
      page={
        <UserPage
          id={id!}
          showEditUserModal={showEditUserModal}
          setShowEditUserModal={setShowEditUserModal}
          showBuildModal={showBuildModal}
          setShowBuildModal={setShowBuildModal}
        />
      }
    />
  )
}

export default UserLayout