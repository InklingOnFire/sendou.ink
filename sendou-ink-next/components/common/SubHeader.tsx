import React from "react";
import { BoxProps, Box } from "@chakra-ui/core";

const SubHeader: React.FC<BoxProps> = (props) => {
  return <Box color="text.secondary" fontSize="90%" {...props} />;
};

export default SubHeader;
