import weapons from "./constants/weapons";

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;

export type Weapon = ElementType<typeof weapons>;

export enum RankedMode {
  SZ,
  TC,
  RM,
  CB,
}

/*
 *
 * ENUMS
 *
 */

export enum PlusTier {
  ONE,
  TWO,
}

export enum PlusRegion {
  EU,
  NA,
}

enum HeadOnlyAbility {
  CB = "CB",
  LDE = "LDE",
  OG = "OG",
  T = "T",
}

enum ClothingOnlyAbility {
  H = "H",
  NS = "NS",
  TI = "TI",
  RP = "RP",
  AD = "AD",
}

enum ShoesOnlyAbility {
  DR = "DR",
  SJ = "SJ",
  OS = "OS",
}

export enum StackableAbility {
  BDU = "BDU",
  REC = "REC",
  RES = "RES",
  ISM = "ISM",
  ISS = "ISS",
  MPU = "MPU",
  QR = "QR",
  QSJ = "QSJ",
  RSU = "RSU",
  SSU = "SSU",
  SCU = "SCU",
  SPU = "SPU",
  SS = "SS",
  BRU = "BRU",
  NONE = "NONE",
}

export const HeadAbility = { ...HeadOnlyAbility, ...StackableAbility };
export const ClothingAbility = { ...ClothingOnlyAbility, ...StackableAbility };
export const ShoesAbility = { ...ShoesOnlyAbility, ...StackableAbility };

export enum CanVC {
  YES,
  SOMETIMES,
  USUALLY,
}

export enum LeaderboardType {
  ONE,
  TWO,
}

export enum LinkType {
  DISCORD,
  GUIDE,
  MISC,
}
