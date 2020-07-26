import { RouteComponentProps } from "@reach/router"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import Layout from "../nav/Layout"
import FreeAgentsPage from "./FreeAgentsPage"
import FreeAgentsPageNav from "./FreeAgentsPageNav"
import { Weapon } from "../../types"

const FreeAgentsLayout: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  const [focusedPost, setFocusedPost] = useState<string | null>(null)
  const [weapon, setWeapon] = useState<Weapon | null>(null)
  const [playstyle, setPlaystyle] = useState<
    "Any" | "Frontline/Slayer" | "Midline/Support" | "Backline/Anchor"
  >("Any")
  const [region, setRegion] = useState<
    "Any" | "Europe" | "The Americas" | "Oceania" | "Other"
  >("Any")
  return (
    <Layout
      title={t("navigation;Free Agents")}
      secondaryNav={
        <FreeAgentsPageNav
          setModalOpen={setModalOpen}
          setFocusedPost={setFocusedPost}
          weapon={weapon}
          region={region}
          playstyle={playstyle}
        />
      }
      page={
        <FreeAgentsPage
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          focusedPost={focusedPost}
          setFocusedPost={setFocusedPost}
          weapon={weapon}
          setWeapon={setWeapon}
          playstyle={playstyle}
          setPlaystyle={setPlaystyle}
          region={region}
          setRegion={setRegion}
        />
      }
    />
  )
}

export default FreeAgentsLayout
