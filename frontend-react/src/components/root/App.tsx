import {
  Flex,
  useColorMode,
  useTheme as useChakraTheme,
  Box,
} from "@chakra-ui/core"
import useLocalStorage from "@rehooks/local-storage"
import React, { useEffect, Suspense } from "react"
import { MyThemeProvider } from "../../themeContext"
import { Theme, ThemeColor } from "../../types"
import IconNav from "../nav/IconNav"
import "./App.css"
import Routes from "./Routes"
import SecondaryNav from "../nav/SecondaryNav"
import Loading from "../common/Loading"

const App: React.FC = () => {
  const chakraTheme = useChakraTheme()
  const { colorMode } = useColorMode()
  const [themeColorFromStorage] = useLocalStorage<ThemeColor>("colorPreference")

  const themeColor = themeColorFromStorage
    ? themeColorFromStorage
    : colorMode === "light"
    ? "pink"
    : "orange"

  const theme = {
    light: {
      colorMode: "light",
      bgColor: "#eff0f3",
      darkerBgColor: "#FFFAFA",
      textColor: "#0d0d0d",
      borderStyle: "1px solid rgba(0, 0, 0, .2)",
      themeColorWithShade: `${themeColor}.500`,
      grayWithShade: "gray.600",
      themeColorHex: chakraTheme.colors[themeColor]["500"],
      themeColorHexLighter: chakraTheme.colors[themeColor]["200"],
      themeColor,
    } as Theme,
    dark: {
      colorMode: "dark",
      bgColor: "#282547",
      darkerBgColor: "#1a1832",
      textColor: "#fffffe",
      borderStyle: "1px solid rgba(255, 255, 255, .2)",
      themeColorWithShade: `${themeColor}.200`,
      grayWithShade: "gray.300",
      themeColorHex: chakraTheme.colors[themeColor]["500"],
      themeColorHexLighter: chakraTheme.colors[themeColor]["200"],
      themeColor,
    } as Theme,
  }

  useEffect(() => {
    const favicon = document.getElementById("favicon") as HTMLLinkElement
    if (!favicon) return
    favicon.href = `/favicon_${themeColor}.png`
  }, [themeColorFromStorage, themeColor])

  return (
    <MyThemeProvider value={theme[colorMode]}>
      <Flex bg={theme[colorMode].darkerBgColor} h="100%">
        <IconNav />
        <Suspense fallback={<Loading />}>
          <SecondaryNav />
        </Suspense>
        <Box maxWidth="1100px" px={8} py={4} mx="auto" overflow="hidden">
          <Routes />
        </Box>
      </Flex>
    </MyThemeProvider>
  )
}

export default App
