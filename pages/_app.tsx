import { ApolloProvider } from "@apollo/client";
import {
  ChakraProvider,
  useColorMode,
  useTheme as useChakraTheme,
} from "@chakra-ui/core";
import Layout from "components/navigation/Layout";
import { useApollo } from "graphql/client";
import { AppProps } from "next/app";
import { MyThemeProvider, Theme } from "utils/themeContext";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const chakraTheme = useChakraTheme();
  let { colorMode = "light" } = useColorMode();
  //@ts-ignore
  if (colorMode === "") colorMode = "light";

  const themeColor = "orange";

  const theme = {
    light: {
      colorMode: "light",
      bgColor: "#eff0f3",
      darkerBgColor: "#FFFAFA",
      textColor: "blackAlpha.900",
      borderStyle: "1px solid rgba(0, 0, 0, .2)",
      themeColorWithShade: `${themeColor}.500`,
      grayWithShade: "gray.600",
      //themeColorHex: chakraTheme.colors[themeColor]["500"],
      //themeColorHexLighter: chakraTheme.colors[themeColor]["200"],
      themeColor,
    } as Theme,
    dark: {
      colorMode: "dark",
      bgColor: "#031e3e",
      darkerBgColor: "#0e2a56",
      textColor: "whiteAlpha.900",
      borderStyle: "1px solid rgba(255, 255, 255, .2)",
      themeColorWithShade: `${themeColor}.200`,
      grayWithShade: "gray.300",
      //themeColorHex: chakraTheme.colors[themeColor]["500"],
      //themeColorHexLighter: chakraTheme.colors[themeColor]["200"],
      themeColor,
    } as Theme,
  };

  return (
    <ChakraProvider resetCSS>
      <MyThemeProvider value={theme[colorMode]}>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </MyThemeProvider>
    </ChakraProvider>
  );
}
