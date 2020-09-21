import { Box, Image } from "@chakra-ui/core";
import FooterContent from "components/navigation/FooterContent";
import dynamic from "next/dynamic";
import { Suspense, useContext, useEffect, useState } from "react";
import MyThemeContext from "utils/themeContext";

const Footer: React.FC = () => {
  const [footerBojoing, setFooterBojoing] = useState<any>(null);
  const { themeColorWithShade, colorMode } = useContext(MyThemeContext);

  useEffect(() => {
    //Math.random() > 0.5 ? footerSquid : footerOcto
    const octoOrSquid = Math.random() > 0.5 ? "boing" : "b8ing";

    const imgSrc = dynamic(
      () => import(`assets/${octoOrSquid}_${colorMode}.png`)
    );
    setFooterBojoing(imgSrc);
  }, []);

  return (
    <Box mt="auto">
      <Box display="flex" alignItems="flex-end">
        {footerBojoing && (
          <Image
            src={footerBojoing}
            bg={themeColorWithShade}
            w="80px"
            h="auto"
            ml="auto"
            mr="50px"
            userSelect="none"
            loading="lazy"
          />
        )}
      </Box>
      <Suspense fallback={null}>
        <FooterContent />
      </Suspense>
    </Box>
  );
};

export default Footer;
