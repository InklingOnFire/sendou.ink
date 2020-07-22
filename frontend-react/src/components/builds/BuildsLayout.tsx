import { RouteComponentProps } from "@reach/router"
import React from "react"
import Layout from "../nav/Layout"
import BuildsPage from "./BuildsPage"
import BuildsPageNav from "./BuildsPageNav"

interface BuildsLayoutProps {
  weaponCode?: string
}

const BuildsLayout: React.FC<RouteComponentProps & BuildsLayoutProps> = ({
  weaponCode,
}) => {
  return (
    <Layout
      titleKey="Builds"
      secondaryNav={<BuildsPageNav />}
      page={<BuildsPage weaponCode={weaponCode!} />}
    />
  )
}

export default BuildsLayout
