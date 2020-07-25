import { Box, Image, Stack, Switch, FormLabel, Flex } from "@chakra-ui/core"
import React, { useState, useContext } from "react"
import { useTranslation } from "react-i18next"
import cb from "../../assets/cb.png"
import rm from "../../assets/rm.png"
import sz from "../../assets/sz.png"
import tc from "../../assets/tc.png"
import { maps } from "../../utils/lists"
import SmallHeader from "../common/SmallHeader"
import NavSearch from "../nav/NavSearch"
import { PlannerMapBg } from "./MapPlannerPage"
import MyThemeContext from "../../themeContext"

interface MapPlannerNavProps {
  bg: PlannerMapBg
  setBg: React.Dispatch<React.SetStateAction<PlannerMapBg>>
}

const MapPlannerNav: React.FC<MapPlannerNavProps> = ({ bg, setBg }) => {
  const { themeColor, grayWithShade, themeColorWithShade } = useContext(
    MyThemeContext
  )
  const { t } = useTranslation()
  const [filterStage, setFilterStage] = useState("")
  const filterLower = filterStage.toLowerCase()

  return (
    <>
      {/*<NavLink
        onClick={() => download(sketch.toDataURL(), "png")}
        linkText={t("plans;Download as .png")}
        icon={FiImage}
      />
      <NavLink
        onClick={() =>
          download(
            "data:text/json;charset=utf-8," +
              encodeURIComponent(JSON.stringify(sketch.toJSON())),
            "json"
          )
        }
        linkText={t("plans;Download as .json")}
        icon={FiDownloadCloud}
      />
      <NavLink linkText={t("plans;Load from .json")} icon={FiUploadCloud} />*/}
      <Box my="1rem">
        <NavSearch value={filterStage} setValue={setFilterStage} />
      </Box>
      <Flex justify="center" align="center">
        <Switch
          size="sm"
          color={themeColor}
          name="topdown"
          mr="0.5rem"
          isChecked={bg.view === "R"}
          onChange={() => setBg({ ...bg, view: bg.view === "M" ? "R" : "M" })}
        />
        <FormLabel
          htmlFor="topdown"
          fontSize="75%"
          fontWeight={500}
          color={grayWithShade}
        >
          TOP-DOWN VIEW
        </FormLabel>
      </Flex>
      {maps
        .filter((stage) => stage.toLowerCase().includes(filterLower))
        .map((stage) => (
          <Box my="0.5rem" key={stage}>
            <SmallHeader
              color={bg.stage === stage ? themeColorWithShade : grayWithShade}
            >
              {t(`game;${stage}`)}
            </SmallHeader>
            <Stack isInline ml="0.4rem" spacing={4}>
              <Image
                style={{
                  filter:
                    bg.stage === stage && bg.mode === "SZ"
                      ? undefined
                      : "grayscale(100%)",
                }}
                src={sz}
                w="1.5rem"
                h="1.5rem"
                ignoreFallback
                cursor="pointer"
                onClick={() => setBg({ ...bg, mode: "SZ", stage })}
              />
              <Image
                style={{
                  filter:
                    bg.stage === stage && bg.mode === "TC"
                      ? undefined
                      : "grayscale(100%)",
                }}
                src={tc}
                w="1.5rem"
                h="1.5rem"
                ignoreFallback
                cursor="pointer"
                onClick={() => setBg({ ...bg, mode: "TC", stage })}
              />
              <Image
                style={{
                  filter:
                    bg.stage === stage && bg.mode === "RM"
                      ? undefined
                      : "grayscale(100%)",
                }}
                src={rm}
                w="1.5rem"
                h="1.5rem"
                ignoreFallback
                cursor="pointer"
                onClick={() => setBg({ ...bg, mode: "RM", stage })}
              />
              <Image
                style={{
                  filter:
                    bg.stage === stage && bg.mode === "CB"
                      ? undefined
                      : "grayscale(100%)",
                }}
                src={cb}
                w="1.5rem"
                h="1.5rem"
                ignoreFallback
                cursor="pointer"
                onClick={() => setBg({ ...bg, mode: "CB", stage })}
              />
            </Stack>
          </Box>
        ))}
    </>
  )
}

export default MapPlannerNav
