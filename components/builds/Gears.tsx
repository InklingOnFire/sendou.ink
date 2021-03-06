import { Box, Flex } from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import GearImage from "components/common/GearImage";
import React from "react";

type BuildViewSlots = Partial<
  Prisma.BuildGetPayload<{
    select: {
      headGear: true;
      clothingGear: true;
      shoesGear: true;
    };
  }>
>;

interface GearsProps {
  build: BuildViewSlots;
}

const Gears: React.FC<GearsProps> = ({ build }) => {
  if (!build.headGear && !build.clothingGear && !build.shoesGear) {
    return <Box h="30px" />;
  }
  return (
    <Flex justifyContent="center">
      <Box w={build.headGear ? "85px" : undefined} h="85px" mx="2px">
        {build.headGear && <GearImage englishName={build.headGear} />}
      </Box>
      <Box w={build.clothingGear ? "85px" : undefined} h="85px" mx="2px">
        {build.clothingGear && <GearImage englishName={build.clothingGear} />}
      </Box>
      <Box w={build.shoesGear ? "85px" : undefined} h="85px" mx="2px">
        {build.shoesGear && <GearImage englishName={build.shoesGear} />}
      </Box>
    </Flex>
  );
};

export default Gears;
