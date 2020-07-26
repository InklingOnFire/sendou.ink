import { useQuery } from "@apollo/client"
import { Box, Divider, Flex, Grid } from "@chakra-ui/core"
import { Link } from "@reach/router"
import React, { useContext } from "react"
import {
  SUGGESTIONS,
  SuggestionsData,
  Suggestion,
} from "../../graphql/queries/suggestions"
import { VOUCHES } from "../../graphql/queries/vouches"
import MyThemeContext from "../../themeContext"
import Error from "../common/Error"
import Loading from "../common/Loading"
import SubHeader from "../common/SubHeader"
import UserAvatar from "../common/UserAvatar"

interface VouchUser {
  username: string
  discriminator: string
  avatar?: string
  discord_id: string
  plus: {
    voucher_user: {
      username: string
      discriminator: string
      discord_id: string
    }
    vouch_status: string
  }
}

interface VouchesData {
  vouches: VouchUser[]
}

const Suggestions: React.FC = () => {
  const { grayWithShade } = useContext(MyThemeContext)

  const { data, error, loading } = useQuery<SuggestionsData>(SUGGESTIONS)
  const {
    data: vouchesData,
    error: vouchesError,
    loading: vouchesLoading,
  } = useQuery<VouchesData>(VOUCHES)

  if (error) return <Error errorMessage={error.message} />
  if (vouchesError) return <Error errorMessage={vouchesError.message} />
  if (loading || vouchesLoading || !data || !vouchesData) return <Loading />
  if (!data.suggestions) return null

  const plusOneVouches = vouchesData.vouches.filter(
    (vouch) => vouch.plus.vouch_status === "ONE"
  )
  const plusTwoVouches = vouchesData.vouches.filter(
    (vouch) => vouch.plus.vouch_status === "TWO"
  )

  const plusOneSuggested = data.suggestions.filter(
    (suggestion) => suggestion.plus_server === "ONE"
  )
  const plusTwoSuggested = data.suggestions.filter(
    (suggestion) => suggestion.plus_server === "TWO"
  )

  const vouchMap = (vouch: VouchUser) => {
    return (
      <React.Fragment key={vouch.discord_id}>
        <Flex mr="0.5rem" alignItems="center">
          <UserAvatar src={vouch.avatar} name={vouch.username} size="sm" />
        </Flex>
        <Box>
          <Box as="span" fontWeight="bold">
            <Link to={`/u/${vouch.discord_id}`}>
              {vouch.username}#{vouch.discriminator}
            </Link>
          </Box>{" "}
          <Box color={grayWithShade} fontSize="0.9rem">
            by {vouch.plus.voucher_user.username}#
            {vouch.plus.voucher_user.discriminator}
          </Box>
        </Box>
      </React.Fragment>
    )
  }

  const suggestionMap = (suggestion: Suggestion) => {
    const suggested_user = suggestion.discord_user
    const suggester_user = suggestion.suggester_discord_user
    return (
      <React.Fragment key={suggestion.discord_user.discord_id}>
        <Flex mr="1em" mt="1rem" alignItems="center">
          <UserAvatar
            src={suggested_user.avatar}
            name={suggested_user.username}
            size="sm"
            mr="0.5rem"
          />
          <Box as="span" fontWeight="bold">
            <Link to={`/u/${suggested_user.discord_id}`}>
              {suggested_user.username}#{suggested_user.discriminator}
            </Link>
          </Box>
        </Flex>
        <Box m="0.5rem">
          <Box display="inline-block" color={grayWithShade} fontSize="0.9rem">
            {suggester_user.username}#{suggester_user.discriminator}:
          </Box>{" "}
          {suggestion.description}
        </Box>
        <Divider my="1rem" />
      </React.Fragment>
    )
  }

  return (
    <>
      <SubHeader>Vouched to +1</SubHeader>
      <Grid gridRowGap="0.5em" gridTemplateColumns="min-content 1fr" mt="1em">
        {plusOneVouches.map(vouchMap)}
      </Grid>
      <Box mt="1em">
        <SubHeader>Vouched to +2</SubHeader>
        <Grid gridRowGap="0.5em" gridTemplateColumns="min-content 1fr" mt="1em">
          {plusTwoVouches.map(vouchMap)}
        </Grid>
      </Box>
      <Box mt="1em">
        <SubHeader>Suggested to +1</SubHeader>
        {plusOneSuggested.map(suggestionMap)}
      </Box>
      <Box mt="1em">
        <SubHeader>Suggested to +2</SubHeader>
        {plusTwoSuggested.map(suggestionMap)}
      </Box>
    </>
  )
}

export default Suggestions
