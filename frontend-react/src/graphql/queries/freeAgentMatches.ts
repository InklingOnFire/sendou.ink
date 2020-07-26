import { gql, DocumentNode } from "@apollo/client"

export interface FreeAgentMatchesData {
  freeAgentMatches: {
    matched_discord_users: {
      username: string
      discriminator: string
      twitter_name?: string
      avatar?: string
      discord_id: string
    }[]
    number_of_likes_received: number
    liked_discord_ids: string[]
  }
}

export const FREE_AGENT_MATCHES: DocumentNode = gql`
  {
    freeAgentMatches {
      matched_discord_users {
        username
        discriminator
        avatar
        discord_id
      }
      number_of_likes_received
      liked_discord_ids
    }
  }
`
