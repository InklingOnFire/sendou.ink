import { RouteComponentProps } from "@reach/router"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import Layout from "../nav/Layout"
import MapPlannerNav from "./MapPlannerNav"
import MapPlannerPage, { PlannerMapBg } from "./MapPlannerPage"

const MapPlannerLayout: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation()
  const [bg, setBg] = useState<PlannerMapBg>({
    view: "M",
    stage: "The Reef",
    mode: "SZ",
  })

  return (
    <Layout
      title={t("navigation;Map Planner")}
      secondaryNav={<MapPlannerNav bg={bg} setBg={setBg} />}
      page={<MapPlannerPage bg={bg} setBg={setBg} />}
    />
  )
}

export default MapPlannerLayout
