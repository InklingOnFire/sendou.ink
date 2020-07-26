import React from "react"
import { Helmet } from "react-helmet-async"
import Suggestions from "./Suggestions"
import SuggestionVouchModal from "./SuggestionVouchModal"

interface PlusPageProps {
  modalOpen: boolean
  closeModal: () => void
  canSuggest: boolean
  canVouch: boolean
  usersPlusServer?: "ONE" | "TWO"
}

const PlusPage: React.FC<PlusPageProps> = ({
  modalOpen,
  closeModal,
  canSuggest,
  canVouch,
  usersPlusServer,
}) => {
  return (
    <>
      <Helmet>
        <title>Plus Server Home | sendou.ink</title>
      </Helmet>
      {modalOpen && (
        <SuggestionVouchModal
          closeModal={closeModal}
          canSuggest={canSuggest}
          canVouch={canVouch}
          plusServer={usersPlusServer!}
        />
      )}
      <Suggestions />
    </>
  )
}

export default PlusPage
