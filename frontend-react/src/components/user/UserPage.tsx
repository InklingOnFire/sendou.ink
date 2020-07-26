import { useQuery } from "@apollo/client"
import {
  Badge,
  Box,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/core"
import { Redirect } from "@reach/router"
import React, { useContext } from "react"
import { Helmet } from "react-helmet-async"
import { Trans, useTranslation } from "react-i18next"
import buildsIcon from "../../assets/navIcons/builds.png"
import xsearchIcon from "../../assets/navIcons/xsearch.png"
import { PLAYER_INFO } from "../../graphql/queries/playerInfo"
import { SEARCH_FOR_BUILDS } from "../../graphql/queries/searchForBuilds"
import {
  SearchForUserData,
  SearchForUserVars,
  SEARCH_FOR_USER,
} from "../../graphql/queries/searchForUser"
import { USER } from "../../graphql/queries/user"
import MyThemeContext from "../../themeContext"
import {
  PlayerInfoData,
  PlayerInfoVars,
  SearchForBuildsData,
  SearchForBuildsVars,
  UserData,
} from "../../types"
import { canAddJpnBuildsIds, weapons } from "../../utils/lists"
import Error from "../common/Error"
import Loading from "../common/Loading"
import Section from "../common/Section"
import Markdown from "../elements/Markdown"
import AvatarWithInfo from "./AvatarWithInfo"
import BuildTab from "./BuildTab"
import XRankTab from "./XRankTab"

interface Tab {
  id: number
  image: string
  title: JSX.Element
  content: JSX.Element
}

interface UserPageProps {
  id: string
  showEditUserModal: boolean
  setShowEditUserModal: React.Dispatch<React.SetStateAction<boolean>>
  showBuildModal: boolean
  setShowBuildModal: React.Dispatch<React.SetStateAction<boolean>>
}

const UserPage: React.FC<UserPageProps> = ({
  id,
  showEditUserModal,
  setShowEditUserModal,
  showBuildModal,
  setShowBuildModal,
}) => {
  const { t } = useTranslation()
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

  const {
    data: playerData,
    error: playerError,
    loading: playerLoading,
  } = useQuery<PlayerInfoData, PlayerInfoVars>(PLAYER_INFO, {
    variables: { twitter: data?.searchForUser?.twitter_name as any },
    skip: !data || !data.searchForUser || !data.searchForUser.twitter_name,
  })

  const { textColor, themeColor, grayWithShade } = useContext(MyThemeContext)

  if (loading || userLoading || buildsLoading || playerLoading)
    return <Loading />
  if (error) return <Error errorMessage={error.message} />
  if (userError) return <Error errorMessage={userError.message} />
  if (buildsError) return <Error errorMessage={buildsError.message} />
  if (playerError) return <Error errorMessage={playerError.message} />
  if (!data || !data.searchForUser || !userData || !buildsData)
    return <Redirect to="/404" />

  const userLean = userData.user
  const user = data.searchForUser
  const builds = buildsData.searchForBuilds

  const tabs: Tab[] = []

  if (builds.length > 0 || userLean?.discord_id === user.discord_id) {
    tabs.push({
      id: 1,
      image: buildsIcon,
      title: (
        <>
          {t("navigation;Builds")}{" "}
          <Badge variantColor={themeColor} ml="0.5em">
            {builds.length}
          </Badge>
        </>
      ),
      content: (
        <TabPanel key={1}>
          <BuildTab
            builds={builds.slice().sort((a, b) => {
              const weaponPool = user.weapons
              if (weaponPool) {
                if (
                  weaponPool.includes(a.weapon) &&
                  weaponPool.includes(b.weapon)
                ) {
                  return (
                    weaponPool.indexOf(a.weapon) - weaponPool.indexOf(b.weapon)
                  )
                }
                const poolComparision =
                  weaponPool.indexOf(b.weapon) - weaponPool.indexOf(a.weapon)

                if (poolComparision !== 0) return poolComparision
              }
              return weapons.indexOf(a.weapon) - weapons.indexOf(b.weapon)
            })}
            canModifyBuilds={userLean?.discord_id === user.discord_id}
            unlimitedBuilds={
              !!userData.user?.discord_id &&
              canAddJpnBuildsIds.includes(userData.user?.discord_id)
            }
            showModal={showBuildModal}
            setShowModal={setShowBuildModal}
          />
        </TabPanel>
      ),
    })
  }

  if (playerData?.playerInfo?.placements) {
    tabs.push({
      id: 2,
      image: xsearchIcon,
      title: (
        <>
          {t("users;X Rank Top 500")}{" "}
          <Badge variantColor={themeColor} ml="0.5em">
            {playerData.playerInfo.placements.length}
          </Badge>
        </>
      ),
      content: (
        <TabPanel key={2}>
          <XRankTab placements={playerData.playerInfo.placements} />
        </TabPanel>
      ),
    })
  } else if (userLean?.discord_id === user.discord_id) {
    tabs.push({
      id: 2,
      image: xsearchIcon,
      title: <>{t("users;X Rank Top 500")}</>,
      content: (
        <TabPanel key={2}>
          <Box color={grayWithShade}>
            <Trans i18nKey="users;noPlacementsPrompt">
              If you have reached Top 500 in a <b>finished</b> X Rank season you
              can have it displayed here! Make sure your Twitter account is
              verified on Discord to get it showing on your sendou.ink profile
              and then contact Sendou#0043 on Discord with your in-game nick.
              Once set up new results are added automatically and no further
              action is needed unless you change your name on Twitter.
            </Trans>
          </Box>
        </TabPanel>
      ),
    })
  }

  return (
    <>
      <Helmet>
        <title>
          {user.username}#{user.discriminator} | sendou.ink
        </title>
      </Helmet>

      <Flex alignItems="center" flexDir="column">
        <AvatarWithInfo
          user={user}
          showModal={showEditUserModal}
          setShowModal={setShowEditUserModal}
        />
        {user.bio && (
          <Section my="1rem" mx="auto" display="inline-block">
            <Markdown value={user.bio} />
          </Section>
        )}
      </Flex>

      <Tabs isFitted variant="line" mt="2em" variantColor={themeColor}>
        <TabList mb="1em">
          {tabs.map((tabObj) => (
            <Tab key={tabObj.id} color={textColor}>
              <Image src={tabObj.image} w="2rem" mr="0.5rem" /> {tabObj.title}
            </Tab>
          ))}
        </TabList>
        <TabPanels>{tabs.map((tabObj) => tabObj.content)}</TabPanels>
      </Tabs>
    </>
  )
}

export default UserPage
