import { useQuery } from "@apollo/client"
import { Box, Flex, Heading, Image } from "@chakra-ui/core"
import { Link } from "@reach/router"
import React, { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import { FiClock, FiEdit, FiInfo } from "react-icons/fi"
import { CompetitiveFeedEvent } from "../../graphql/queries/upcomingEvents"
import { USER } from "../../graphql/queries/user"
import MyThemeContext from "../../themeContext"
import { UserData } from "../../types"
import Section from "../common/Section"
import UserAvatar from "../common/UserAvatar"
import IconButton from "../elements/IconButton"
import Markdown from "../elements/Markdown"
import TournamentModal from "./TournamentModal"

interface TournamentInfoProps {
  tournament: CompetitiveFeedEvent
  date: Date
  expandedByDefault?: boolean
}

const TournamentInfo: React.FC<TournamentInfoProps> = ({
  tournament,
  date,
  expandedByDefault,
}) => {
  const { themeColorWithShade, grayWithShade } = useContext(MyThemeContext)
  const { i18n } = useTranslation()
  const [expanded, setExpanded] = useState(!!expandedByDefault)
  const [showModal, setShowModal] = useState(false)
  const poster = tournament.poster_discord_user

  const { data: userData } = useQuery<UserData>(USER)

  return (
    <Section my="1rem" p="1.2rem 1rem 0.7rem">
      {showModal && (
        <TournamentModal
          competitiveFeedEvent={tournament}
          closeModal={() => setShowModal(false)}
        />
      )}
      <>
        <Box mx="0.5rem">
          <Heading
            fontFamily="'Rubik', sans-serif"
            size="lg"
            color={!!expandedByDefault ? themeColorWithShade : undefined}
          >
            {tournament.name}
          </Heading>
          <Flex alignItems="center" color={grayWithShade} mt="0.5rem">
            <Box as={FiClock} mr="0.5em" color={themeColorWithShade} />
            {date.toLocaleString(i18n.language, {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </Flex>

          <Flex
            alignItems="center"
            color={grayWithShade}
            mt="1.1rem"
            mb="0.5rem"
          >
            {poster.avatar && (
              <Box mr="0.5em">
                <UserAvatar
                  name={poster.username}
                  src={poster.avatar}
                  size="sm"
                />
              </Box>
            )}{" "}
            <Link to={`/u/${poster.discord_id}`}>
              <Box>
                {poster.username}#{poster.discriminator}
              </Box>
            </Link>
          </Flex>
        </Box>

        <Flex>
          <Box mr="1em">
            <a href={tournament.discord_invite_url}>
              <IconButton colored icon={"discord" as any} />
            </a>
          </Box>
          <Box mr="1em">
            <IconButton
              colored
              icon={FiInfo}
              onClick={() => setExpanded(!expanded)}
            />
          </Box>
          {userData?.user?.discord_id === poster.discord_id && (
            <IconButton
              colored
              icon={FiEdit}
              onClick={() => setShowModal(true)}
            />
          )}
        </Flex>
      </>
      {expanded && (
        <Box mt="1rem" mx="0.5rem">
          <Markdown value={tournament.description} />
          {tournament.picture_url && (
            <Image
              borderRadius="5px"
              maxH="500px"
              mx="auto"
              src={tournament.picture_url}
            />
          )}
        </Box>
      )}
    </Section>
  )
}

export default TournamentInfo
