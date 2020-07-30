import React from "react";
import { Image, ImageProps } from "@chakra-ui/core";
import { englishInternalWeapons } from "../../constants/englishInternalWeapons";
import { Weapon } from "../../types";
//import { useTranslation } from "react-i18next"

interface WeaponImageProps {
  name: Weapon;
  size?: "SMALL" | "SMEDIUM" | "MEDIUM" | "BIG";
}

const sizeWhMap: Record<
  "SMALL" | "SMEDIUM" | "MEDIUM" | "BIG",
  string | undefined
> = {
  SMALL: "32px",
  SMEDIUM: "48px",
  MEDIUM: "64px",
  BIG: undefined,
};

const WeaponImage: React.FC<WeaponImageProps & ImageProps> = ({
  name,
  size = "MEDIUM",
  ...props
}) => {
  //const { t } = useTranslation()

  const wh = sizeWhMap[size];
  return (
    <Image
      src={`/assets/weapons/Wst_${englishInternalWeapons.get(name)}.png`}
      /*alt={t(`game;${englishName}`)}
      title={noTitle ? undefined : t(`game;${englishName}`)}*/
      w={wh}
      h={wh}
      {...props}
    />
  );
};

export default WeaponImage;
