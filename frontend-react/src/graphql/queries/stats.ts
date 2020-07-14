import { gql, DocumentNode } from "@apollo/client"

export const STATS: DocumentNode = gql`
  {
    stats {
      build_count
      tournament_count
      fa_count
      user_count
    }
  }
`
