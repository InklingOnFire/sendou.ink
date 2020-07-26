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

const PlusLayout: React.FC<RouteComponentProps> = () => {
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
        <PlusPage
          modalOpen={suggestionVouchModalOpen}
          closeModal={() => setSuggestionVouchModalOpen(false)}
          canSuggest={!ownSuggestion && isMember}
          canVouch={canVouch}
          usersPlusServer={userData?.user?.plus?.membership_status}
        />
      }
    />
  )
}

export default PlusLayout
