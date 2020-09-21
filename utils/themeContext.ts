import { createContext } from "react";

export interface Theme {
  colorMode: "dark" | "light";
  bgColor: string;
  darkerBgColor: string;
  textColor: string;
  borderStyle: string;
  grayWithShade: string;
  themeColorWithShade: string;
  themeColorHex: string;
  themeColorHexLighter: string;
  themeColor: string;
}

const MyThemeContext = createContext<Theme>({
  colorMode: "dark",
  bgColor: "#232946",
  darkerBgColor: "#0A102D",
  textColor: "#fffffe",
  borderStyle: "1px solid rgba(255, 255, 255, .2)",
  themeColorWithShade: "pink.200",
  grayWithShade: "gray.300",
  themeColorHex: "#D53F8C",
  themeColorHexLighter: "#FBB6CE",
  themeColor: "pink",
});

export const MyThemeProvider = MyThemeContext.Provider;
export default MyThemeContext;
