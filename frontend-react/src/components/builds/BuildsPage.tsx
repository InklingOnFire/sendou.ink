import { useQuery } from "@apollo/client"
import { Box, Button, Flex, Heading } from "@chakra-ui/core"
import { RouteComponentProps } from "@reach/router"
import React, { useContext, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import InfiniteScroll from "react-infinite-scroller"
import { SEARCH_FOR_BUILDS } from "../../graphql/queries/searchForBuilds"
import MyThemeContext from "../../themeContext"
import { Build, SearchForBuildsData, SearchForBuildsVars } from "../../types"
import { linkCodeToWeapon } from "../../utils/lists"
import Error from "../common/Error"
import Loading from "../common/Loading"
import Alert from "../elements/Alert"
import BuildCard from "./BuildCard"

interface BuildsPageProps {
  weaponCode?: string
}

const BuildsPage: React.FC<BuildsPageProps & RouteComponentProps> = ({
  weaponCode,
}) => {
  const { themeColor } = useContext(MyThemeContext)
  const { t } = useTranslation()
  const [buildsToShow, setBuildsToShow] = useState(10)
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set())

  const weapon = linkCodeToWeapon[weaponCode ?? ""]

  const { data, error, loading } = useQuery<
    SearchForBuildsData,
    SearchForBuildsVars
  >(SEARCH_FOR_BUILDS, {
    variables: { weapon: weapon },
  })
  if (error) return <Error errorMessage={error.message} />

  const buildsFilterByAbilities: Build[] = !data ? [] : data.searchForBuilds

  const usersOtherBuilds: { [key: string]: Build[] } = {}

  const buildsOnePerUserUnlessExpanded = buildsFilterByAbilities.reduce(
    (buildsArray: Build[], build) => {
      const discord_id = build.discord_user!.discord_id
      if (!usersOtherBuilds[discord_id]) {
        usersOtherBuilds[discord_id] = []
        return [...buildsArray, build]
      }

      usersOtherBuilds[discord_id] = [...usersOtherBuilds[discord_id], build]
      return buildsArray
    },
    []
  )

  return (
    <>
      <Helmet>
        <title>
          {t("navigation;Builds")} {weapon ? `- ${t(`game;${weapon}`)}` : ""} -
          sendou.ink
        </title>
      </Helmet>
      {loading && <Loading />}
      {buildsFilterByAbilities.length > 0 && data && (
        <>
          <InfiniteScroll
            pageStart={1}
            loadMore={(page) => setBuildsToShow(page * 10)}
            hasMore={buildsToShow < data.searchForBuilds.length}
          >
            <Flex flexWrap="wrap" pt="2em">
              {buildsOnePerUserUnlessExpanded
                .filter((_, index) => index < buildsToShow)
                .reduce((buildElementsArray: JSX.Element[], build) => {
                  const allBuildsByUserToShow = []
                  allBuildsByUserToShow.push(
                    <BuildCard
                      key={build.id}
                      build={build}
                      showUser
                      otherBuildCount={
                        usersOtherBuilds[build.discord_user!.discord_id]
                          .length &&
                        !expandedUsers.has(build.discord_user!.discord_id)
                          ? usersOtherBuilds[build.discord_user!.discord_id]
                              .length + 1
                          : undefined
                      }
                      onShowAllByUser={() =>
                        setExpandedUsers(
                          new Set(
                            expandedUsers.add(build.discord_user!.discord_id)
                          )
                        )
                      }
                      m="0.5em"
                    />
                  )

                  if (expandedUsers.has(build.discord_user!.discord_id)) {
                    allBuildsByUserToShow.push(
                      ...usersOtherBuilds[
                        build.discord_user!.discord_id
                      ].map((build) => (
                        <BuildCard
                          key={build.id}
                          build={build}
                          showUser
                          m="0.5em"
                        />
                      ))
                    )
                  }

                  return [...buildElementsArray, ...allBuildsByUserToShow]
                }, [])}
            </Flex>
          </InfiniteScroll>
          <Box w="50%" textAlign="center" mx="auto" mt="1em">
            <Heading size="sm" fontFamily="rubik">
              {t("builds;No more builds to show")}
            </Heading>
            <Button
              variantColor={themeColor}
              variant="outline"
              mt="1em"
              onClick={() => window.scrollTo(0, 0)}
            >
              {t("builds;Return to the top")}
            </Button>
          </Box>
        </>
      )}
      {weapon && buildsFilterByAbilities.length === 0 && !loading && (
        <Alert status="info">
          {t("builds;No builds found with the current filter")}
        </Alert>
      )}
    </>
  )
}

export default BuildsPage
