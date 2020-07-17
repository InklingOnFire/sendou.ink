import React from "react"

import english_internal from "../../utils/english_internal.json"
import { weapons } from "../../assets/imageImports"
import { Weapon } from "../../types.js"
import { useTranslation } from "react-i18next"
import { Image, ImageProps } from "@chakra-ui/core"

interface WeaponImageProps {
  englishName: Weapon
  weaponSize: "SMALL" | "SMEDIUM" | "MEDIUM" | "BIG"
  asInlineBlock?: boolean
  noTitle?: boolean
}

const sizeWhMap: Record<
  "SMALL" | "SMEDIUM" | "MEDIUM" | "BIG",
  string | undefined
> = {
  SMALL: "32px",
  SMEDIUM: "48px",
  MEDIUM: "64px",
  BIG: undefined,
}

const WeaponImage: React.FC<WeaponImageProps & ImageProps> = ({
  englishName,
  weaponSize,
  asInlineBlock,
  noTitle,
  ...props
}) => {
  const { t } = useTranslation()
  const dictToUse: any = weapons
  const wh = sizeWhMap[weaponSize]
  return (
    <Image
      src={dictToUse[english_internal[englishName]]}
      ignoreFallback
      alt={t(`game;${englishName}`)}
      title={noTitle ? undefined : t(`game;${englishName}`)}
      w={wh}
      h={wh}
      display={asInlineBlock ? "inline-block" : undefined}
      {...props}
    />
  )
}

export default WeaponImage
