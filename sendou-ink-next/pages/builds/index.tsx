import React from "react";
import { Box, Flex } from "@chakra-ui/core";
import { NextPage } from "next";
import SecondaryNav from "../../components/nav/SecondaryNav";
import { weaponCategories } from "../../constants/weaponCategories";
import SubHeader from "../../components/common/SubHeader";
import WeaponImage from "../../components/common/WeaponImage";

const BuildsPage: NextPage = () => {
  return (
    <>
      <SecondaryNav title="Builds">
        {weaponCategories.map((category) => (
          <React.Fragment key={category.label}>
            <SubHeader mt="1em" ml="0.3rem">
              {category.label}
            </SubHeader>
            <Flex flexWrap="wrap">
              {category.options.map((wpn) => (
                <WeaponImage
                  key={wpn.value}
                  name={wpn.value}
                  size="SMALL"
                  m="0.3rem"
                />
              ))}
            </Flex>
          </React.Fragment>
        ))}
      </SecondaryNav>
      <Box>
        <Box fontWeight="bold">Jee</Box>
        <Box color="text.secondary">secondary text</Box>
      </Box>
    </>
  );
};

export default BuildsPage;
