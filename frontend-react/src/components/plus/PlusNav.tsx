import { useQuery } from "@apollo/client"
import React from "react"
import {
  FiMap,
  FiMapPin,
  FiThumbsUp,
  FiUserCheck,
  FiUserPlus,
  FiClipboard,
  FiUsers,
} from "react-icons/fi"
import { PlusInfoData, PLUS_INFO } from "../../graphql/queries/plusInfo"
import SmallHeader from "../common/SmallHeader"
import NavLink from "../nav/NavLink"
import {
  PLUS_DRAFT_CUPS,
  PlusDraftCupsData,
} from "../../graphql/queries/plusDraftCups"
import { months } from "../../utils/lists"

const getFirstFridayDate = () => {
  const today = new Date()
  const month =
    today.getDate() <= 7 && today.getDay() <= 5
      ? today.getMonth()
      : today.getMonth() + 1

  let day = 1
  while (day <= 7) {
    const dateOfVoting = new Date(
      Date.UTC(today.getFullYear(), month, day, 15, 0, 0)
    )

    if (dateOfVoting.getDay() === 5) return "" + dateOfVoting.getTime()

    day++
  }

  console.error("Couldn't resolve first friday of the month for voting")
  return "" + new Date(2000, 1, 1).getTime()
}

interface PlusNavProps {
  isMember: boolean
  canSuggest: boolean
  canVouch: boolean
  openModal: () => void
}

const PlusNav: React.FC<PlusNavProps> = ({
  isMember,
  canSuggest,
  canVouch,
  openModal,
}) => {
  const { data: plusInfoData } = useQuery<PlusInfoData>(PLUS_INFO)
  const { data: draftCupData } = useQuery<PlusDraftCupsData>(PLUS_DRAFT_CUPS)

  const suggestVouchLinkText = () => {
    if (!canVouch) return "Suggest"
    if (!canSuggest) return "Vouch"

    return "Suggest or vouch"
  }

  const votingIsNotActive = !plusInfoData || !plusInfoData.plusInfo?.voting_ends

  return (
    <>
      <NavLink icon={FiUsers} linkText="Suggests & vouches" linkTo="/plus" />
      <NavLink
        icon={FiUserCheck}
        linkText={suggestVouchLinkText()}
        onClick={openModal}
        disabled={
          !(canSuggest || canVouch) ||
          !plusInfoData ||
          !!plusInfoData.plusInfo?.voting_ends
        }
      />
      {votingIsNotActive ? (
        <SmallHeader>
          Next voting:{" "}
          {new Date(parseInt(getFirstFridayDate())).toLocaleString("en", {
            month: "long",
            day: "numeric",
          })}
        </SmallHeader>
      ) : (
        <NavLink
          icon={FiThumbsUp}
          linkText="Vote on players"
          linkTo="/plus/voting"
        />
      )}
      <NavLink
        icon={FiUserPlus}
        linkText="Player voting history"
        linkTo="/plus/history"
      />
      <NavLink
        icon={FiMap}
        linkText="Map voting history"
        linkTo="/plus/maphistory"
      />
      <NavLink
        icon={FiMapPin}
        linkText="Vote on maps"
        linkTo="/plus/mapvoting"
        disabled={!isMember}
      />
      <SmallHeader mt="2rem">Draft Cup</SmallHeader>
      <NavLink icon={FiClipboard} linkText="Leaderboard" linkTo="/draft" />
      {draftCupData?.plusDraftCups.tournaments
        .slice()
        .sort(
          (a, b) =>
            new Date(parseInt(b.date)).getTime() -
            new Date(parseInt(a.date)).getTime()
        )
        .map((tournament) => {
          const date = new Date(parseInt(tournament.date))
          const link = `/draft/${
            tournament.type === "DRAFTTWO" ? "2" : "1"
          }-${months[date.getMonth() + 1].toLowerCase()}-${date.getFullYear()}`

          const linkText = `${tournament.type === "DRAFTONE" ? "+1" : "+2"} ${
            months[date.getMonth() + 1]
          } ${date.getFullYear()}`

          return <NavLink linkText={linkText} linkTo={link} sub />
        })}
    </>
  )
}

export default PlusNav
