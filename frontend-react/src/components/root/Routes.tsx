import { Router } from "@reach/router"
import React, { lazy, Suspense } from "react"
import NotFound from "./NotFound"
import { ScrollToTop } from "./ScrollToTop"
import LoadingLayout from "./LoadingLayout"

const HomePage = lazy(() => import("../home/HomePage"))
const UserLayout = lazy(() => import("../user/UserLayout"))
const UserSearchPage = lazy(() => import("../usersearch/UserSearchPage"))
const MarkdownHelpPage = lazy(() => import("../markdown/MarkdownHelpPage"))
const BuildsLayout = lazy(() => import("../builds/BuildsLayout"))
const BuildAnalyzerPage = lazy(() => import("../analyzer/BuildAnalyzerPage"))
const CalendarLayout = lazy(() => import("../calendar/CalendarLayout"))
const TournamentsPage = lazy(() => import("../tournaments/TournamentsPage"))
const EventPage = lazy(() => import("../events/EventsPage"))
const TournamentsDetailsPage = lazy(() =>
  import("../tournaments/TournamentDetailsPage")
)
const MapPlannerLayout = lazy(() => import("../plans/MapPlannerLayout"))
const FreeAgentsPage = lazy(() => import("../freeagents/FreeAgentsPage"))
const TeamPage = lazy(() => import("../team/TeamPage"))
const XSearch = lazy(() => import("../xsearch/Top500BrowserPage"))
const XTrends = lazy(() => import("../xtrends/XTrendsPage"))
const PlusPage = lazy(() => import("../plus/PlusPage"))
const DraftCupPage = lazy(() => import("../plusdraftcup/DraftCupPage"))
const DraftCupDetails = lazy(() => import("../plusdraftcup/DraftCupDetails"))
const Access = lazy(() => import("./Access"))
const VotingHistoryPage = lazy(() => import("../plus/VotingHistoryPage"))
const MapVotingHistoryPage = lazy(() => import("../plus/MapVotingHistoryPage"))
const MapVoting = lazy(() => import("../plus/MapVoting"))
const About = lazy(() => import("./About"))
const Links = lazy(() => import("./Links"))
const TranslatePage = lazy(() => import("../translate/TranslatePage"))
const AdminPage = lazy(() => import("../admin/AdminPage"))

const Routes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingLayout />}>
      <Router>
        <ScrollToTop path="/">
          <HomePage path="/" />
          <AdminPage path="/admin" />
          <TranslatePage path="/translate" />
          <UserLayout path="/u/:id" />
          <UserSearchPage path="/u" />
          <MarkdownHelpPage path="/markdown" />
          <TeamPage path="/t/:name" />
          <BuildsLayout path="/builds/*weaponCode" />
          <BuildAnalyzerPage path="/analyzer" />
          <EventPage path="/event" />
          <MapPlannerLayout path="/plans" />
          <CalendarLayout path="/calendar" />
          <TournamentsPage path="/tournaments" />
          <TournamentsDetailsPage path="/tournaments/:id" />
          <FreeAgentsPage path="/freeagents" />
          <XSearch path="/xsearch" />
          <XTrends path="/xtrends" />
          <About path="/about" />
          <Links path="/links" />
          <Access path="/access" />
          <PlusPage path="/plus" />
          <DraftCupPage path="/draft" />
          <DraftCupDetails path="/draft/:id" />
          <VotingHistoryPage path="/plus/history" />
          <MapVotingHistoryPage path="/plus/maphistory" />
          <MapVoting path="/plus/mapvoting" />
          <NotFound default />
        </ScrollToTop>
      </Router>
    </Suspense>
  )
}

export default Routes
