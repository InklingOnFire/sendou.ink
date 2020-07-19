import { useQuery } from "@apollo/client"
import { Box, Flex, PseudoBox } from "@chakra-ui/core"
import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import {
  UpcomingEventsData,
  UPCOMING_EVENTS,
} from "../../graphql/queries/upcomingEvents"
import MyThemeContext from "../../themeContext"
import { Link } from "@reach/router"

const CalendarPageNav: React.FC = () => {
  const { i18n } = useTranslation()
  const { grayWithShade } = useContext(MyThemeContext)
  const { data } = useQuery<UpcomingEventsData>(UPCOMING_EVENTS)

  const events = data ? data.upcomingEvents : []

  return (
    <>
      {events.map((event) => {
        const date = new Date(parseInt(event.date))
        return (
          <Flex
            key={event.name}
            fontWeight="bold"
            my="1rem"
            mx="0.4rem"
            w="175px"
            alignItems="center"
          >
            <Box
              fontSize="75%"
              fontWeight={500}
              color={grayWithShade}
              mr="0.3rem"
            >
              {date.toLocaleString(i18n.language, {
                month: "2-digit",
                day: "2-digit",
              })}
            </Box>

            <PseudoBox
              style={{ textOverflow: "ellipsis" }}
              whiteSpace="nowrap"
              overflow="hidden"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              <Link to={`/calendar?name=${encodeURIComponent(event.name)}`}>
                {event.name}
              </Link>
            </PseudoBox>
          </Flex>
        )
      })}
    </>
  )
}

export default CalendarPageNav
