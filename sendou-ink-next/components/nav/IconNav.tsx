import React from "react";
import { Image, Flex, PseudoBox } from "@chakra-ui/core";

const iconNavItems = [
  {
    route: "calendar",
  },
  {
    route: "plans",
  },
  {
    route: "builds",
  },
  {
    route: "analyzer",
  },
  {
    route: "xsearch",
  },
  {
    route: "tournaments",
  },
] as const;

const IconNav: React.FC = () => {
  return (
    <Flex
      h="100vh"
      w={16}
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      {iconNavItems.map(({ route }) => (
        <PseudoBox
          key={route}
          w="48px"
          h="48px"
          my="0.3rem"
          cursor="pointer"
          transition="0.3s transform"
          _hover={{ transform: "scale(1.15)" }}
        >
          <Image src={`/assets/nav-icons/${route}.png`} />
        </PseudoBox>
      ))}
    </Flex>
  );
};

export default IconNav;
