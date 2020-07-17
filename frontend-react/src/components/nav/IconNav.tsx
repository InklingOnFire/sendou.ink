import React from "react"
import { Box, Flex, PseudoBox, Image } from "@chakra-ui/core"
import calendarIcon from "../../assets/navIcons/calendar.png"
import plansIcon from "../../assets/navIcons/plans.png"
import buildsIcon from "../../assets/navIcons/builds.png"
import analyzerIcon from "../../assets/navIcons/analyzer.png"
import xsearchIcon from "../../assets/navIcons/xsearch.png"
import tournamentsIcon from "../../assets/navIcons/tournaments.png"
import { Link } from "@reach/router"

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
] as const

const IconNav: React.FC = () => {
  return (
    <Flex
      flexShrink={0}
      h="100vh"
      w={16}
      top={0}
      position="sticky"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      {iconNavItems.map(({ route, icon }) => (
        <Link to={route}>
          <PseudoBox
            w="48px"
            h="48px"
            my="0.3rem"
            cursor="pointer"
            transition="0.3s transform"
            _hover={{ transform: "scale(1.15)" }}
          >
            <Image ignoreFallback key={route} src={icon} />
          </PseudoBox>
        </Link>
      ))}
    </Flex>
  )
}

export default IconNav
