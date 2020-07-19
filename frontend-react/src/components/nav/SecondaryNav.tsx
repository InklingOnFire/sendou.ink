import { Box } from "@chakra-ui/core"
import { RouteComponentProps, Router } from "@reach/router"
import React, { ReactNode, Suspense, useContext } from "react"
import MyThemeContext from "../../themeContext"
import BuildsPageNav from "../builds/BuildsPageNav"
import Loading from "../common/Loading"
import "./Nav.css"
import CalendarPageNav from "../calendar/CalendarPageNav"
import { useTranslation } from "react-i18next"

interface NavWithContentProps {
  title: string
  content: ReactNode
}

const NavWithContent: React.FC<RouteComponentProps & NavWithContentProps> = ({
  title,
  content,
}) => {
  const { themeColorWithShade } = useContext(MyThemeContext)
  return (
    <>
      <Box
        fontWeight="bold"
        fontSize="1.2rem"
        borderLeftColor={themeColorWithShade}
        borderLeftWidth="5px"
        pl="0.7rem"
        ml="0.3rem"
        mb="0.5rem"
      >
        {title}
      </Box>
      {content}
    </>
  )
}

const SecondaryNav: React.FC = () => {
  const { t } = useTranslation()
  const { bgColor } = useContext(MyThemeContext)
  return (
    <Box
      flexShrink={0}
      className="hide-scroll"
      top={0}
      position="sticky"
      as="nav"
      h="100vh"
      w="200px"
      overflowY="scroll"
      bg={bgColor}
      p="1rem 0.5rem"
    >
      <Suspense fallback={<Loading />}>
        <Router>
          <NavWithContent
            path="/builds/*weaponCode"
            title={t("navigation;Builds")}
            content={<BuildsPageNav />}
          />
          <NavWithContent
            path="/calendar"
            title={t("navigation;Calendar")}
            content={<CalendarPageNav />}
          />
        </Router>
      </Suspense>
    </Box>
  )
}

export default SecondaryNav
