import { Box, Flex } from "@chakra-ui/core";
import Link from "next/link";
import React, { useContext } from "react";
//import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa";
import { DiscordIcon } from "../../assets/icons";
import MyThemeContext from "../../frontend-react/src/themeContext";

const FooterContent: React.FC = () => {
  //const { t } = useTranslation();
  const { darkerBgColor, themeColorWithShade } = useContext(MyThemeContext);
  return (
    <Flex
      p="25px"
      flexShrink={0}
      alignItems="center"
      fontWeight="bold"
      letterSpacing="1px"
      flexWrap="wrap"
      justifyContent="space-between"
      bg={darkerBgColor}
      borderTopColor={themeColorWithShade}
      borderTopWidth="5px"
    >
      <Flex flexWrap="wrap" justifyContent="space-between">
        <Box mr="1em">
          <Link href="/about">{/*t("footer;About")*/}</Link>
        </Box>
        <Link href="/links">{/*t("footer;External links")*/}</Link>
      </Flex>
      <Flex alignItems="center" flexWrap="wrap" justifyContent="center">
        <a href="https://discord.gg/sendou">
          <DiscordIcon h="30px" w="30px" m="1em" />
        </a>
        <a href="https://github.com/Sendouc/sendou.ink">
          <Box as={FaGithub} size="30px" m="1em" />
        </a>
      </Flex>
    </Flex>
  );
};

export default FooterContent;
