import React, { useState } from "react"
import Layout from "../nav/Layout"
import UserPageNav from "./UserPageNav"
import UserPage from "./UserPage"
import { RouteComponentProps, useLocation } from "@reach/router"
import { useQuery } from "@apollo/client"
import {
  SearchForBuildsData,
  SearchForBuildsVars,
  UserData,
  PlayerInfoData,
  PlayerInfoVars,
} from "../../types"
import { SEARCH_FOR_BUILDS } from "../../graphql/queries/searchForBuilds"
import {
  SearchForUserData,
  SearchForUserVars,
  SEARCH_FOR_USER,
} from "../../graphql/queries/searchForUser"
import { USER } from "../../graphql/queries/user"
import { PLAYER_INFO } from "../../graphql/queries/playerInfo"

interface UserLayoutProps {
  id?: string
}

const UserLayout: React.FC<RouteComponentProps & UserLayoutProps> = ({
  id,
}) => {
  const location = useLocation()
  const [showEditUserModal, setShowEditUserModal] = useState(false)
  const [showBuildModal, setShowBuildModal] = useState(false) //new URLSearchParams(location.search).get("build") === "new"

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

  return (
    <Layout
      titleKey="User's Page"
      secondaryNav={
        <UserPageNav
          editProfile={() => setShowEditUserModal(true)}
          newBuild={() => setShowBuildModal(true)}
          canEdit={
            !!userData?.user?.discord_id &&
            userData?.user?.discord_id === data?.searchForUser?.discord_id
          }
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
