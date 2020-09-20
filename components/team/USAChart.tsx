import { Box } from "@chakra-ui/core";
import React, { useContext } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import MyThemeContext from "../../frontend-react/src/themeContext";

interface USAChartProps {
  states: string[];
}

const USAChart: React.FC<USAChartProps> = ({ states }) => {
  const { bgColor, themeColorHex } = useContext(MyThemeContext);
  return (
    <Box w="75%" mx="auto">
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    stroke={themeColorHex}
                    geography={geo}
                    fill={
                      states.includes(geo.properties.name)
                        ? themeColorHex
                        : bgColor
                    }
                  />
                );
              })}
              {geographies.map((geo) => {
                return <g key={geo.rsmKey + "-name"} />;
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </Box>
  );
};

export default USAChart;
