import { RouteComponentProps } from "@reach/router"
import React from "react"
import Layout from "../nav/Layout"
import BuildsPage from "./BuildsPage"
import BuildsPageNav from "./BuildsPageNav"
import { useTranslation } from "react-i18next"

interface BuildsLayoutProps {
  weaponCode?: string
}

const BuildsLayout: React.FC<RouteComponentProps & BuildsLayoutProps> = ({
  weaponCode,
}) => {
  const { t } = useTranslation()
  return (
    <Layout
      title={t("navigation;Builds")}
      secondaryNav={<BuildsPageNav />}
      page={<BuildsPage weaponCode={weaponCode!} />}
    />
  )
}

export default BuildsLayout
