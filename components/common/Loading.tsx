import { Box, Spinner } from "@chakra-ui/core";
import React, { useContext, useEffect, useState } from "react";
import MyThemeContext from "../../frontend-react/src/themeContext";

const Loading: React.FC = () => {
  const { themeColorWithShade } = useContext(MyThemeContext);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!showSpinner) return null;

  return (
    <Box textAlign="center" pt="2em">
      <Spinner
        color={themeColorWithShade}
        size="xl"
        thickness="4px"
        speed="0.65s"
      />
    </Box>
  );
};

export default Loading;
