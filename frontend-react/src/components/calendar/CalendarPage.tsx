import { useQuery } from "@apollo/client"
import { Box } from "@chakra-ui/core"
import { useLocation } from "@reach/router"
import React, { useContext, useEffect, useRef } from "react"
import { Helmet } from "react-helmet-async"
import { Trans, useTranslation } from "react-i18next"
import {
  UpcomingEventsData,
  UPCOMING_EVENTS,
} from "../../graphql/queries/upcomingEvents"
import MyThemeContext from "../../themeContext"
import { getWeek } from "../../utils/helperFunctions"
import Error from "../common/Error"
import Loading from "../common/Loading"
import SubHeader from "../common/SubHeader"
import TournamentInfo from "./TournamentInfo"

const CalendarPage: React.FC = () => {
  const { grayWithShade } = useContext(MyThemeContext)
  const { t } = useTranslation()
  const location = useLocation()
  const matchingRef = useRef<HTMLDivElement>(null)

  const { data, error, loading } = useQuery<UpcomingEventsData>(UPCOMING_EVENTS)

  const searchParamsEventName = new URLSearchParams(location.search).get("name")

  useEffect(() => {
    if (!matchingRef?.current) return

    matchingRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
  })

  if (loading) return <Loading />
  if (error) return <Error errorMessage={error.message} />

  const events = data!.upcomingEvents

  let lastPrintedWeek: number | null = null
  const thisWeekNumber = getWeek(new Date())

  const timeNow = new Date().toTimeString()

  return (
    <>
      <Helmet>
        <title>{t("calendar;Competitive Calendar")} | sendou.ink</title>
      </Helmet>
      {events.map((event) => {
        const time = new Date(parseInt(event.date))
        const weekNumber = getWeek(time)
        const printWeekHeader = weekNumber !== lastPrintedWeek

        if (printWeekHeader) {
          lastPrintedWeek = weekNumber
        }

        return (
          <React.Fragment key={event.discord_invite_url}>
            {printWeekHeader && (
              <Box my="1rem">
                <SubHeader>
                  <Trans i18nKey="calendar;weekNumber">
                    Week {{ weekNumber }}
                  </Trans>{" "}
                  {thisWeekNumber === weekNumber && (
                    <>({t("calendar;This week")})</>
                  )}
                </SubHeader>
              </Box>
            )}
            <div
              ref={
                event.name === searchParamsEventName ? matchingRef : undefined
              }
            >
              <TournamentInfo
                tournament={event}
                date={time}
                expandedByDefault={event.name === searchParamsEventName}
              />
            </div>
          </React.Fragment>
        )
      })}
      <Box color={grayWithShade}>
        <Trans i18nKey="calendar;footer">
          All events listed in your local time: {{ timeNow }}
          <p style={{ marginTop: "0.5em" }}>
            If you want your event displayed here message Sendou#0043 on Discord
          </p>
        </Trans>
      </Box>
    </>
  )
}

export default CalendarPage
