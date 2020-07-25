import { RouteComponentProps } from "@reach/router"
import React from "react"
import Layout from "../nav/Layout"
import CalendarPageNav from "./CalendarPageNav"
import CalendarPage from "./CalendarPage"
import { useTranslation } from "react-i18next"

const CalendarLayout: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation()
  return (
    <Layout
      title={t("navigation;Calendar")}
      secondaryNav={<CalendarPageNav />}
      page={<CalendarPage />}
    />
  )
}

export default CalendarLayout
