import { RouteComponentProps } from "@reach/router"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import Layout from "../nav/Layout"
import FreeAgentsPage from "./FreeAgentsPage"
import FreeAgentsPageNav from "./FreeAgentsPageNav"

const FreeAgentsLayout: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <Layout
      title={t("navigation;Free Agents")}
      secondaryNav={<FreeAgentsPageNav setModalOpen={setModalOpen} />}
      page={
        <FreeAgentsPage modalOpen={modalOpen} setModalOpen={setModalOpen} />
      }
    />
  )
}

export default FreeAgentsLayout
