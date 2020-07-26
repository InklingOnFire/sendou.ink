import { useQuery, useMutation } from "@apollo/client"
import {
  Box,
  Collapse,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/core"
import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { FaFilter } from "react-icons/fa"
import {
  FreeAgentMatchesData,
  FREE_AGENT_MATCHES,
} from "../../graphql/queries/freeAgentMatches"
import { FREE_AGENT_POSTS } from "../../graphql/queries/freeAgentPosts"
import { USER } from "../../graphql/queries/user"
import {
  FreeAgentPost,
  FreeAgentPostsData,
  UserData,
  Weapon,
} from "../../types"
import { continents } from "../../utils/lists"
import Error from "../common/Error"
import Loading from "../common/Loading"
import WeaponSelector from "../common/WeaponSelector"
import Button from "../elements/Button"
import RadioGroup from "../elements/RadioGroup"
import FAPostModal from "./FAPostModal"
import Matches from "./Matches"
import Posts from "./Posts"
import { AddFreeAgentPostVars } from "../../graphql/mutations/addFreeAgentPost"
import { UPDATE_FREE_AGENT_POST } from "../../graphql/mutations/updateFreeAgentPost"

const playstyleToEnum = {
  "Frontline/Slayer": "FRONTLINE",
  "Midline/Support": "MIDLINE",
  "Backline/Anchor": "BACKLINE",
} as const

const ExpiringPostAlert: React.FC<{ faPost?: FreeAgentPost }> = ({
  faPost,
}) => {
  const { t } = useTranslation()
  const toast = useToast()
  const [editFreeAgentPost, { loading: editLoading }] = useMutation<
    boolean,
    AddFreeAgentPostVars
  >(UPDATE_FREE_AGENT_POST, {
    variables: { ...(faPost as AddFreeAgentPostVars) },
    onError: (error) => {
      toast({
        title: t("users;An error occurred"),
        description: error.message,
        position: "top-right",
        status: "error",
        duration: 10000,
      })
    },
    refetchQueries: [{ query: FREE_AGENT_POSTS }],
  })

  if (!faPost) return null

  const updatedDate = new Date(parseInt(faPost.updatedAt)).getTime()
  const monthAgo = new Date().setMonth(new Date().getMonth() - 1)
  const twoWeeksAgo = new Date(Date.now() - 12096e5).getTime()

  if (updatedDate > twoWeeksAgo) return null

  const alreadyHidden = updatedDate < monthAgo
  return (
    <Alert
      status={alreadyHidden ? "warning" : "info"}
      variant="subtle"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      my="2rem"
    >
      <AlertIcon size="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {t(
          `freeagents;${alreadyHidden ? "expiredTitle" : "aboutToExpireTitle"}`
        )}
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        {t(
          `freeagents;${
            alreadyHidden ? "expiredContent" : "aboutToExpireContent"
          }`
        )}
        <Box mt="1rem">
          <Button onClick={() => editFreeAgentPost()} loading={editLoading}>
            {t("freeagents;unexpireButton")}
          </Button>
        </Box>
      </AlertDescription>
    </Alert>
  )
}

interface FreeAgentsPageProps {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  focusedPost: string | null
  setFocusedPost: React.Dispatch<React.SetStateAction<string | null>>
  weapon: Weapon | null
  setWeapon: React.Dispatch<React.SetStateAction<Weapon | null>>
  playstyle: "Any" | "Frontline/Slayer" | "Midline/Support" | "Backline/Anchor"
  setPlaystyle: React.Dispatch<
    React.SetStateAction<
      "Any" | "Frontline/Slayer" | "Midline/Support" | "Backline/Anchor"
    >
  >
  region: "Any" | "Europe" | "The Americas" | "Oceania" | "Other"
  setRegion: React.Dispatch<
    React.SetStateAction<
      "Any" | "Europe" | "The Americas" | "Oceania" | "Other"
    >
  >
}

const FreeAgentsPage: React.FC<FreeAgentsPageProps> = ({
  modalOpen,
  setModalOpen,
  focusedPost,
  setFocusedPost,
  weapon,
  setWeapon,
  playstyle,
  setPlaystyle,
  region,
  setRegion,
}) => {
  const { t } = useTranslation()
  const [showFilters, setShowFilters] = useState(false)
  const { data, error, loading } = useQuery<FreeAgentPostsData>(
    FREE_AGENT_POSTS
  )
  const {
    data: userData,
    error: userQueryError,
    loading: userQueryLoading,
  } = useQuery<UserData>(USER)
  const { data: matchesData, error: matchesError } = useQuery<
    FreeAgentMatchesData
  >(FREE_AGENT_MATCHES)

  if (error) return <Error errorMessage={error.message} />
  if (userQueryError) return <Error errorMessage={userQueryError.message} />
  if (matchesError) return <Error errorMessage={matchesError.message} />
  if (loading || userQueryLoading) return <Loading />

  const faPosts = data!.freeAgentPosts

  const ownFAPost = faPosts.find(
    (post) => post.discord_user.discord_id === userData!.user?.discord_id
  )

  const altWeaponMap = new Map([
    ["Splattershot", "Hero Shot Replica"],
    ["Tentatek Splattershot", "Octo Shot Replica"],
    ["Blaster", "Hero Blaster Replica"],
    ["Splat Roller", "Hero Roller Replica"],
    ["Octobrush", "Herobrush Replica"],
    ["Splat Charger", "Hero Charger Replica"],
    ["Slosher", "Hero Slosher Replica"],
    ["Heavy Splatling", "Hero Splatling Replica"],
    ["Splat Dualies", "Hero Dualie Replicas"],
    ["Splat Brella", "Hero Brella Replica"],
  ])

  const postsFilter = (post: FreeAgentPost) => {
    const usersWeapons = post.discord_user.weapons ?? []

    if (
      weapon &&
      !(
        usersWeapons.includes(weapon) ||
        usersWeapons.includes(altWeaponMap.get(weapon) as any)
      )
    ) {
      return false
    }

    if (playstyle !== "Any") {
      if (post.playstyles.indexOf(playstyleToEnum[playstyle]) === -1)
        return false
    }

    if (region !== "Any") {
      if (!post.discord_user.country) {
        if (region === "Other") return true

        return false
      }

      const continentCode = continents[post.discord_user.country]

      if (region === "Europe" && continentCode !== "EU") return false
      else if (
        region === "The Americas" &&
        continentCode !== "NA" &&
        continentCode !== "SA"
      )
        return false
      else if (region === "Oceania" && continentCode !== "OC") return false
      else if (
        region === "Other" &&
        continentCode !== "AF" &&
        continentCode !== "AN" &&
        continentCode !== "AS" &&
        continentCode !== "OC"
      )
        return false
    }

    return true
  }

  return (
    <>
      <Helmet>
        <title>{t("navigation;Free Agents")} | sendou.ink</title>
      </Helmet>
      {modalOpen && (
        <FAPostModal closeModal={() => setModalOpen(false)} post={ownFAPost} />
      )}
      <Flex justifyContent="space-between" flexWrap="wrap">
        <Box m="0.5em">
          <Button icon={FaFilter} onClick={() => setShowFilters(!showFilters)}>
            {showFilters
              ? t("freeagents;Hide filters")
              : t("freeagents;Show filters")}
          </Button>
        </Box>
      </Flex>
      <Collapse mt={4} isOpen={showFilters}>
        <Box maxW="600px" my="1em">
          <RadioGroup
            value={playstyle}
            setValue={setPlaystyle}
            label={t("freeagents;Playstyle")}
            options={[
              { value: "Any", label: t("freeagents;Any") },
              {
                value: "Frontline/Slayer",
                label: t("freeagents;Frontline/Slayer"),
              },
              {
                value: "Midline/Support",
                label: t("freeagents;Midline/Support"),
              },
              {
                value: "Backline/Anchor",
                label: t("freeagents;Backline/Anchor"),
              },
            ]}
          ></RadioGroup>
        </Box>
        <Box maxW="600px" my="1em">
          <RadioGroup
            value={region}
            setValue={setRegion}
            label={t("freeagents;Region")}
            options={[
              { value: "Any", label: t("freeagents;Any") },
              { value: "Europe", label: t("freeagents;Europe") },
              { value: "The Americas", label: t("freeagents;The Americas") },
              { value: "Oceania", label: t("freeagents;Oceania") },
              { value: "Other", label: t("freeagents;Other") },
            ]}
          />
        </Box>
        <Box maxW="600px" my="1em">
          <WeaponSelector
            label="Weapon"
            value={weapon}
            setValue={(weapon: string) => setWeapon(weapon as Weapon)}
            clearable
          />
        </Box>
      </Collapse>
      <ExpiringPostAlert faPost={ownFAPost} />
      {matchesData && (
        <Box mt="1em">
          <Matches
            matches={matchesData.freeAgentMatches.matched_discord_users}
            likesReceived={
              matchesData.freeAgentMatches.number_of_likes_received
            }
            setFocusedPost={setFocusedPost}
          />
        </Box>
      )}
      <Posts
        posts={faPosts.filter(postsFilter)}
        canLike={!!ownFAPost}
        likedUsersIds={
          !matchesData ? [] : matchesData.freeAgentMatches.liked_discord_ids
        }
        focusedPost={focusedPost}
      />
    </>
  )
}

export default FreeAgentsPage
