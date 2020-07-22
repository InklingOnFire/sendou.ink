import { RouteComponentProps } from "@reach/router"
import React from "react"
import Layout from "../nav/Layout"
import CalendarPageNav from "./CalendarPageNav"
import CalendarPage from "./CalendarPage"

const BuildsLayout: React.FC<RouteComponentProps> = ({}) => {
  return (
    <Layout
      titleKey="Calendar"
      secondaryNav={<CalendarPageNav />}
      page={<CalendarPage />}
    />
  )
}

export default BuildsLayout
