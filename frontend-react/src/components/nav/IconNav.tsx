import { Flex, Image, PseudoBox } from "@chakra-ui/core"
import { Link } from "@reach/router"
import React from "react"
import analyzerIcon from "../../assets/navIcons/analyzer.png"
import buildsIcon from "../../assets/navIcons/builds.png"
import calendarIcon from "../../assets/navIcons/calendar.png"
import freeAgentsIcon from "../../assets/navIcons/freeagents.png"
import plansIcon from "../../assets/navIcons/plans.png"
import settingsIcon from "../../assets/navIcons/settings.png"
import tournamentsIcon from "../../assets/navIcons/tournaments.png"
import xsearchIcon from "../../assets/navIcons/xsearch.png"
import UserItem from "./UserItem"

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
    route: "tournaments",
    icon: tournamentsIcon,
  },
  {
    route: "freeagents",
    icon: freeAgentsIcon,
  },

  {
    route: "xsearch",
    icon: xsearchIcon,
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
      <PseudoBox
        w="48px"
        h="48px"
        my="0.7rem"
        pt="0.5rem"
        cursor="pointer"
        transition="0.3s transform"
        borderTop="1px solid"
        borderColor="#003165"
      >
        <Image ignoreFallback src={settingsIcon} />
      </PseudoBox>
      <UserItem />
    </Flex>
  )
}

export default IconNav
