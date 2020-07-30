import { CSSReset, ThemeProvider, theme, Flex } from "@chakra-ui/core";
import { AppProps } from "next/app";
import React from "react";
import IconNav from "../components/nav/IconNav";
import Head from "next/head";
import "./styles.css";

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: {
      lighter: "#282547",
      darker: "#1a1832",
    },
    text: {
      main: "#fffffe",
      secondary: "#AAAAAA",
    },
  },
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link
          href={`https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap`}
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Flex
          w="100vw"
          h="100vh"
          color="text.main"
          bg="background.darker"
          fontFamily="Nunito, sans-serif"
        >
          <IconNav />
          <Component {...pageProps} />
        </Flex>
      </ThemeProvider>
    </>
  );
};

export default App;
