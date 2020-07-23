import { Flex, Image, PseudoBox } from "@chakra-ui/core"
import { Link } from "@reach/router"
import React from "react"
import analyzerIcon from "../../assets/navIcons/analyzer.png"
import buildsIcon from "../../assets/navIcons/builds.png"
import calendarIcon from "../../assets/navIcons/calendar.png"
import plansIcon from "../../assets/navIcons/plans.png"
import tournamentsIcon from "../../assets/navIcons/tournaments.png"
import xsearchIcon from "../../assets/navIcons/xsearch.png"
import loginIcon from "../../assets/navIcons/login.png"
import teamsIcon from "../../assets/navIcons/teams.png"
import settingsIcon from "../../assets/navIcons/settings.png"
import userSearchIcon from "../../assets/navIcons/usersearch.png"
import freeAgentsIcon from "../../assets/navIcons/freeagents.png"

const iconNavItems = [
  {
    route: "calendar",
    icon: calendarIcon,
  },
  {
    route: "plans",
    icon: plansIcon,
  },
  {
    route: "builds",
    icon: buildsIcon,
  },
  {
    route: "analyzer",
    icon: analyzerIcon,
  },
  {
    route: "xsearch",
    icon: xsearchIcon,
  },
  {
    route: "tournaments",
    icon: tournamentsIcon,
  },
  {
    route: "u",
    icon: userSearchIcon,
  },
  {
    route: "freeagents",
    icon: freeAgentsIcon,
  },
  {
    route: "t",
    icon: teamsIcon,
  },
  {
    route: "settings",
    icon: settingsIcon,
  },
  {
    route: "login",
    icon: loginIcon,
  },
] as const

const IconNav: React.FC = () => {
  return (
    <Flex
      display={["none", null, "flex"]}
      flexShrink={0}
      h="100vh"
      w="4.5rem"
      top={0}
      position="sticky"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      {iconNavItems.map(({ route, icon }) => (
        <Link key={route} to={route}>
          <PseudoBox
            w="48px"
            h="48px"
            my="0.3rem"
            cursor="pointer"
            transition="0.3s transform"
            _hover={{ transform: "scale(1.15)" }}
          >
            <Image ignoreFallback src={icon} />
          </PseudoBox>
        </Link>
      ))}
    </Flex>
  )
}

export default IconNav
