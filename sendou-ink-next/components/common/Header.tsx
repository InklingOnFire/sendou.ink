import React from "react";
import { HeadingProps, Heading } from "@chakra-ui/core";

const Header: React.FC<HeadingProps> = (props) => {
  return <Heading fontFamily="Nunito, sans-serif" {...props} />;
};

export default Header;
