import { useQuery } from "@apollo/client"
import React from "react"
import { useTranslation } from "react-i18next"
import { FiPlus } from "react-icons/fi"
import { FREE_AGENT_POSTS } from "../../graphql/queries/freeAgentPosts"
import { USER } from "../../graphql/queries/user"
import {
  FreeAgentPostsData,
  UserData,
  Weapon,
  FreeAgentPost,
} from "../../types"
import Flag from "../common/Flag"
import SmallHeader from "../common/SmallHeader"
import NavLink from "../nav/NavLink"
import { Box } from "@chakra-ui/core"
import { continents } from "../../utils/lists"

interface FreeAgentsPageNav {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setFocusedPost: React.Dispatch<React.SetStateAction<string | null>>
  weapon: Weapon | null
  playstyle: "Any" | "Frontline/Slayer" | "Midline/Support" | "Backline/Anchor"
  region: "Any" | "Europe" | "The Americas" | "Oceania" | "Other"
}

const FreeAgentsPageNav: React.FC<FreeAgentsPageNav> = ({
  setModalOpen,
  setFocusedPost,
  weapon,
  playstyle,
  region,
}) => {
  const { t } = useTranslation()
  const { data: userData } = useQuery<UserData>(USER)
  const { data: freeAgentPostsData } = useQuery<FreeAgentPostsData>(
    FREE_AGENT_POSTS
  )

  const ownFAPost = freeAgentPostsData?.freeAgentPosts.find(
    (post) => post.discord_user.discord_id === userData?.user?.discord_id
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

  const playstyleToEnum = {
    "Frontline/Slayer": "FRONTLINE",
    "Midline/Support": "MIDLINE",
    "Backline/Anchor": "BACKLINE",
  } as const

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
      {userData?.user && (
        <NavLink
          onClick={() => setModalOpen(true)}
          linkText={
            ownFAPost
              ? t("freeagents;Edit free agent post")
              : t("freeagents;New free agent post")
          }
          icon={FiPlus}
        />
      )}
      {freeAgentPostsData?.freeAgentPosts.filter(postsFilter).map((post) => (
        <SmallHeader
          key={post.discord_user.discord_id}
          onClick={() => {
            setFocusedPost(post.discord_user.discord_id)
            window.scrollTo(0, 0)
          }}
          cursor="pointer"
        >
          {post.discord_user.country ? (
            <Flag code={post.discord_user.country} />
          ) : (
            <Box display="inline-block" w="0.5rem" />
          )}
          {post.discord_user.username}
        </SmallHeader>
      ))}
    </>
  )
}

export default FreeAgentsPageNav
