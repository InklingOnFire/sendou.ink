import React, { useContext } from "react";
import MyThemeContext from "../../frontend-react/src/themeContext";
import "./SubHeader.css";

interface SubHeaderProps {
  children: React.ReactNode;
}

const SubHeader: React.FC<SubHeaderProps> = ({ children }) => {
  const { themeColorHex, themeColorHexLighter, colorMode } = useContext(
    MyThemeContext
  );
  const style = {
    "--sub-header-border":
      colorMode === "dark" ? themeColorHexLighter : themeColorHex,
  } as React.CSSProperties;
  return (
    <h2 className="decorated">
      <span style={style}>{children}</span>
    </h2>
  );
};

export default SubHeader;
