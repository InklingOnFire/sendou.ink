import React, { useState } from "react"
import { FreeAgentPost, UserLean, UserData } from "../../types"
import { Grid, Box, Heading } from "@chakra-ui/core"
import Alert from "../elements/Alert"
import FreeAgentCard from "./FreeAgentCard"
import InfiniteScroll from "react-infinite-scroller"
import Button from "../elements/Button"
import { useTranslation } from "react-i18next"
import { useQuery } from "@apollo/client"
import { USER } from "../../graphql/queries/user"

interface PostsAccordionProps {
  posts: FreeAgentPost[]
  canLike: boolean
  likedUsersIds: string[]
  focusedPost: string | null
}

const Posts: React.FC<PostsAccordionProps> = ({
  posts,
  canLike,
  likedUsersIds,
  focusedPost,
}) => {
  const { t } = useTranslation()
  const { data: userData } = useQuery<UserData>(USER)
  const [agentsToShow, setAgentsToShow] = useState(5)

  if (posts.length === 0) {
    return (
      <Alert status="info">
        {t("freeagents;No free agents found with the current filter")}
      </Alert>
    )
  }

  const postToDisplayFirst = posts.find(
    (post) =>
      focusedPost === post.discord_user.discord_id ||
      (!focusedPost &&
        userData?.user?.discord_id === post.discord_user.discord_id)
  )

  return (
    <>
      {postToDisplayFirst && (
        <Box mt="1em">
          <FreeAgentCard
            post={postToDisplayFirst}
            canLike={canLike}
            likedUsersIds={likedUsersIds}
            highlighted
          />
        </Box>
      )}
      <Grid gridTemplateColumns="repeat(auto-fit, minmax(260px, 1fr))">
        <InfiniteScroll
          pageStart={1}
          loadMore={(page) => setAgentsToShow(page * 10)}
          hasMore={agentsToShow < posts.length}
        >
          {posts
            .filter(
              (post, index) =>
                index < agentsToShow &&
                post.discord_user.discord_id !==
                  postToDisplayFirst?.discord_user.discord_id
            )
            .map((post) => (
              <Box my="1em" key={post.id}>
                <FreeAgentCard
                  post={post}
                  canLike={canLike}
                  likedUsersIds={likedUsersIds}
                />
              </Box>
            ))}
        </InfiniteScroll>
      </Grid>
      <Box w="50%" textAlign="center" mx="auto" mt="1em">
        <Heading size="sm">
          {t("freeagents;No more free agents to show")}
        </Heading>
        <Box mt="1em">
          <Button outlined onClick={() => window.scrollTo(0, 0)}>
            {t("freeagents;Return to the top")}
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Posts
