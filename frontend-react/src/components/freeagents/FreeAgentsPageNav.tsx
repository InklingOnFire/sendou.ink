import React from "react"
import NavLink from "../nav/NavLink"
import { FiPlus } from "react-icons/fi"
import { useQuery } from "@apollo/client"
import { USER } from "../../graphql/queries/user"
import {
  UserData,
  FreeAgentPostsData,
  FreeAgentPost,
  UserLean,
} from "../../types"
import { FREE_AGENT_POSTS } from "../../graphql/queries/freeAgentPosts"
import { useTranslation } from "react-i18next"
import SmallHeader from "../common/SmallHeader"
import Flag from "../common/Flag"

interface FreeAgentsPageNav {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FreeAgentsPageNav: React.FC<FreeAgentsPageNav> = ({ setModalOpen }) => {
  const { t } = useTranslation()
  const { data: userData } = useQuery<UserData>(USER)
  const { data: freeAgentPostsData } = useQuery<FreeAgentPostsData>(
    FREE_AGENT_POSTS
  )

  const ownFAPost = freeAgentPostsData?.freeAgentPosts.find(
    (post) => post.discord_user.discord_id === userData?.user?.discord_id
  )

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
      {freeAgentPostsData?.freeAgentPosts.map((post) => (
        <SmallHeader key={post.discord_user.discord_id}>
          {post.discord_user.country && (
            <Flag code={post.discord_user.country} />
          )}
          {post.discord_user.username}
        </SmallHeader>
      ))}
    </>
  )
}

export default FreeAgentsPageNav
