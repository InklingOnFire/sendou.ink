import React from "react"
import Layout from "../nav/Layout"
import SecondaryNav from "../nav/SecondaryNav"
import Loading from "../common/Loading"

const LoadingLayout: React.FC = () => (
  <Layout secondaryNav={<SecondaryNav />} page={<Loading />} />
)

export default LoadingLayout
