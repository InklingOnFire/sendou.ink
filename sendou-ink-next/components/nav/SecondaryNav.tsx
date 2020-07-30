import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/core";

interface SecondaryNavProps {
  title: string;
  children?: ReactNode;
}

const SecondaryNav: React.FC<SecondaryNavProps> = ({ title, children }) => {
  return (
    <Box as="nav" h="100vh" w="200px" bg="background.lighter" p="0.5rem">
      <Box fontWeight="bold" fontSize="1.2rem">
        {title}
      </Box>
      {children}
    </Box>
  );
};

export default SecondaryNav;
