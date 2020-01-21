import React from "react"
import { RouteComponentProps, Redirect } from "@reach/router"
import { useQuery } from "@apollo/react-hooks"

import { SEARCH_FOR_USER } from "../../graphql/queries/searchForUser"
import { USER } from "../../graphql/queries/user"
import Loading from "../common/Loading"
import Error from "../common/Error"
import {
  SearchForUserData,
  SearchForUserVars,
  UserData,
  SearchForBuildsData,
  SearchForBuildsVars,
} from "../../types"
import { FaTshirt, FaTrophy } from "react-icons/fa"
import { IconType } from "react-icons/lib/cjs"
import AvatarWithInfo from "./AvatarWithInfo"
import WeaponPool from "./WeaponPool"
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/core"
import useTheme from "../../hooks/useTheme"
import { Helmet } from "react-helmet-async"
import { SEARCH_FOR_BUILDS } from "../../graphql/queries/searchForBuilds"
import BuildTab from "./BuildTab"

interface Tab {
  id: number
  icon: IconType
  title: String
  content: JSX.Element
}

interface UserPageProps {
  id?: string
}

const UserPage: React.FC<RouteComponentProps & UserPageProps> = ({ id }) => {
  const { data, error, loading } = useQuery<
    SearchForUserData,
    SearchForUserVars
  >(SEARCH_FOR_USER, {
    variables: isNaN(id as any) ? { custom_url: id } : { discord_id: id },
  })
  const { data: userData, error: userError, loading: userLoading } = useQuery<
    UserData
  >(USER)
  const {
    data: buildsData,
    error: buildsError,
    loading: buildsLoading,
  } = useQuery<SearchForBuildsData, SearchForBuildsVars>(SEARCH_FOR_BUILDS, {
    variables: { discord_id: data?.searchForUser?.discord_id as any },
    skip: !data || !data.searchForUser,
  })

  const { textColor, themeColor, themeColorWithShade } = useTheme()

  if (loading || userLoading || buildsLoading) return <Loading />
  if (error) return <Error errorMessage={error.message} />
  if (userError) return <Error errorMessage={userError.message} />
  if (buildsError) return <Error errorMessage={buildsError.message} />
  if (!data || !data.searchForUser || !userData || !buildsData)
    return <Redirect to="/404" />

  const userLean = userData.user
  const user = data.searchForUser
  const builds = buildsData.searchForBuilds

  const tabs = [] as Tab[]

  if (builds.length > 0 || userLean?.discord_id === user.discord_id) {
    tabs.push({
      id: 1,
      icon: FaTshirt,
      title: "Builds",
      content: (
        <TabPanel key={1}>
          <BuildTab
            builds={builds}
            canModifyBuilds={userLean?.discord_id === user.discord_id}
          />
        </TabPanel>
      ),
    })
  }

  if (true) {
    tabs.push({
      id: 2,
      icon: FaTrophy,
      title: "X Rank Top 500",
      content: (
        <TabPanel key={2}>
          <p>hi</p>
        </TabPanel>
      ),
    })
  }

  return (
    <>
      <Helmet>
        <title>{user.username} | sendou.ink</title>
      </Helmet>
      <AvatarWithInfo user={user} />
      {user.weapons && user.weapons.length > 0 && (
        <Box textAlign="center" mt="1em">
          <WeaponPool weapons={user.weapons} />
        </Box>
      )}
      <Tabs isFitted variant="line" mt="2em" variantColor={themeColor}>
        <TabList mb="1em">
          {tabs.map(tabObj => (
            <Tab key={tabObj.id} color={textColor}>
              <Box
                as={tabObj.icon}
                size="24px"
                color={themeColorWithShade}
                mr="7px"
              />{" "}
              {tabObj.title}
            </Tab>
          ))}
        </TabList>
        <TabPanels>{tabs.map(tabObj => tabObj.content)}</TabPanels>
      </Tabs>
    </>
  )
}

export default UserPage
