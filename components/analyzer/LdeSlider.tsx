import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/core";
import React, { useContext } from "react";
import { Trans, useTranslation } from "react-i18next";
import MyThemeContext from "../../frontend-react/src/themeContext";
import AbilityIcon from "../builds/AbilityIcon";

interface LdeSliderProps {
  value: number;
  setValue: (value: number) => void;
}

const LdeSlider: React.FC<LdeSliderProps> = ({ value, setValue }) => {
  const { themeColor, themeColorWithShade, grayWithShade } = useContext(
    MyThemeContext
  );
  const { t } = useTranslation();
  const bonusAp = Math.floor((24 / 21) * value);

  const getLdeEffect = () => {
    if (value === 21) return t("analyzer;ldeFullEffectExplanation");

    const pointMark = 51 - value;
    if (value > 0)
      return (
        <Trans i18nKey="analyzer;ldeInBetweenExplanation">
          Enemy has reached the {{ pointMark }} point mark
        </Trans>
      );
    return t("analyzer;ldeNoEffectExplanation");
  };
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mb="1em"
    >
      <Slider
        value={value}
        onChange={(value: number) => setValue(value)}
        max={21}
      >
        <SliderTrack bg={`${themeColor}.100`}>
          <SliderFilledTrack bg={themeColorWithShade} />
        </SliderTrack>
        <SliderThumb w={6} h={6}>
          <Box minW="30px">
            <AbilityIcon ability="LDE" size="TINY" />
          </Box>
        </SliderThumb>
      </Slider>
      {value > 0 && (
        <Box color={themeColorWithShade} fontWeight="bold" mt="1em">
          +{bonusAp}
          {t("analyzer;abilityPointShort")}{" "}
          {["ISM", "ISS", "REC"].map((ability) => (
            <Box as="span" mx="0.2em" key={ability}>
              <AbilityIcon ability={ability as any} size="SUBTINY" />
            </Box>
          ))}
        </Box>
      )}
      <Box
        color={grayWithShade}
        fontSize="0.75em"
        maxW="200px"
        mt="1em"
        textAlign="center"
      >
        {getLdeEffect()}
      </Box>
    </Flex>
  );
};

export default LdeSlider;
