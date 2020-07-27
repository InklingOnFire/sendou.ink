import { RouteComponentProps } from "@reach/router"
import React, { useState } from "react"
import Layout from "../nav/Layout"
import { useTranslation } from "react-i18next"
import PlusPage from "./PlusPage"
import PlusNav from "./PlusNav"
import { useQuery } from "@apollo/client"
import { UserData } from "../../types"
import { USER } from "../../graphql/queries/user"
import { SUGGESTIONS, SuggestionsData } from "../../graphql/queries/suggestions"
import VotingHistoryPage from "./VotingHistoryPage"
import SuggestionVouchModal from "./SuggestionVouchModal"
import MapVoting from "./MapVoting"
import MapVotingHistoryPage from "./MapVotingHistoryPage"
import DraftCupPage from "../plusdraftcup/DraftCupPage"
import DraftCupDetails from "../plusdraftcup/DraftCupDetails"

interface PlusLayoutProps {
  page:
    | "MAIN"
    | "VOTING"
    | "VOTING_HISTORY"
    | "MAP_VOTING"
    | "MAP_HISTORY"
    | "DRAFT_LEADERBOARD"
    | "DRAFT_TOURNAMENT"
  tournamentId?: string
}

const PlusLayout: React.FC<RouteComponentProps & PlusLayoutProps> = ({
  page,
  tournamentId,
}) => {
  const { t } = useTranslation()
  const [suggestionVouchModalOpen, setSuggestionVouchModalOpen] = useState(
    false
  )
  const { data: userData } = useQuery<UserData>(USER)
  const { data: suggestionsData } = useQuery<SuggestionsData>(SUGGESTIONS)

  const ownSuggestion = suggestionsData?.suggestions.find(
    (suggestion) =>
      suggestion.suggester_discord_user.discord_id ===
      userData?.user?.discord_id
  )

  const isMember = !!userData?.user?.plus?.membership_status

  const canSuggest = !ownSuggestion && isMember

  const canVouch = !!(
    userData?.user?.plus?.can_vouch && !userData.user.plus.can_vouch_again_after
  )

  const Page = () => {
    switch (page) {
      case "MAIN":
        return <PlusPage />
      case "VOTING":
        return null
      case "VOTING_HISTORY":
        return <VotingHistoryPage />
      case "MAP_VOTING":
        return <MapVoting />
      case "MAP_HISTORY":
        return <MapVotingHistoryPage />
      case "DRAFT_LEADERBOARD":
        return <DraftCupPage />
      case "DRAFT_TOURNAMENT":
        return <DraftCupDetails id={tournamentId} />
      default:
        console.error(`Invalid plus page: ${page}`)
        return null
    }
  }

  return (
    <Layout
      title={t("navigation;Plus Server")}
      secondaryNav={
        <PlusNav
          isMember={isMember}
          canSuggest={canSuggest}
          canVouch={canVouch}
          openModal={() => setSuggestionVouchModalOpen(true)}
        />
      }
      page={
        <>
          {suggestionVouchModalOpen && (
            <SuggestionVouchModal
              closeModal={() => setSuggestionVouchModalOpen(false)}
              canSuggest={canSuggest}
              canVouch={canVouch}
              plusServer={userData?.user?.plus?.membership_status!}
            />
          )}
          <Page />
        </>
      }
    />
  )
}

export default PlusLayout
