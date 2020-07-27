import React from "react"
import { Helmet } from "react-helmet-async"
import Suggestions from "./Suggestions"

const PlusPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Plus Server Home | sendou.ink</title>
      </Helmet>
      <Suggestions />
    </>
  )
}

export default PlusPage
