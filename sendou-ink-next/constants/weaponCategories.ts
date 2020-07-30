import { Weapon } from "types";

const shooters = [
  "Sploosh-o-matic",
  "Neo Sploosh-o-matic",
  "Sploosh-o-matic 7",
  "Splattershot Jr.",
  "Custom Splattershot Jr.",
  "Kensa Splattershot Jr.",
  "Splash-o-matic",
  "Neo Splash-o-matic",
  "Aerospray MG",
  "Aerospray RG",
  "Aerospray PG",
  "Splattershot",
  "Hero Shot Replica",
  "Tentatek Splattershot",
  "Octo Shot Replica",
  "Kensa Splattershot",
  ".52 Gal",
  ".52 Gal Deco",
  "Kensa .52 Gal",
  "N-ZAP '85",
  "N-ZAP '89",
  "N-ZAP '83",
  "Splattershot Pro",
  "Forge Splattershot Pro",
  "Kensa Splattershot Pro",
  ".96 Gal",
  ".96 Gal Deco",
  "Jet Squelcher",
  "Custom Jet Squelcher",
] as const;

const semiauto = [
  "L-3 Nozzlenose",
  "L-3 Nozzlenose D",
  "Kensa L-3 Nozzlenose",
  "H-3 Nozzlenose",
  "H-3 Nozzlenose D",
  "Cherry H-3 Nozzlenose",
  "Squeezer",
  "Foil Squeezer",
] as const;

const blasters = [
  "Luna Blaster",
  "Luna Blaster Neo",
  "Kensa Luna Blaster",
  "Blaster",
  "Hero Blaster Replica",
  "Custom Blaster",
  "Range Blaster",
  "Custom Range Blaster",
  "Grim Range Blaster",
  "Rapid Blaster",
  "Rapid Blaster Deco",
  "Kensa Rapid Blaster",
  "Rapid Blaster Pro",
  "Rapid Blaster Pro Deco",
  "Clash Blaster",
  "Clash Blaster Neo",
] as const;

const rollers = [
  "Carbon Roller",
  "Carbon Roller Deco",
  "Splat Roller",
  "Hero Roller Replica",
  "Krak-On Splat Roller",
  "Kensa Splat Roller",
  "Dynamo Roller",
  "Gold Dynamo Roller",
  "Kensa Dynamo Roller",
  "Flingza Roller",
  "Foil Flingza Roller",
] as const;

const brushes = [
  "Inkbrush",
  "Inkbrush Nouveau",
  "Permanent Inkbrush",
  "Octobrush",
  "Herobrush Replica",
  "Octobrush Nouveau",
  "Kensa Octobrush",
] as const;

const chargers = [
  "Classic Squiffer",
  "New Squiffer",
  "Fresh Squiffer",
  "Splat Charger",
  "Hero Charger Replica",
  "Firefin Splat Charger",
  "Kensa Charger",
  "Splatterscope",
  "Firefin Splatterscope",
  "Kensa Splatterscope",
  "E-liter 4K",
  "Custom E-liter 4K",
  "E-liter 4K Scope",
  "Custom E-liter 4K Scope",
  "Bamboozler 14 Mk I",
  "Bamboozler 14 Mk II",
  "Bamboozler 14 Mk III",
  "Goo Tuber",
  "Custom Goo Tuber",
] as const;

const sloshers = [
  "Slosher",
  "Hero Slosher Replica",
  "Slosher Deco",
  "Soda Slosher",
  "Tri-Slosher",
  "Tri-Slosher Nouveau",
  "Sloshing Machine",
  "Sloshing Machine Neo",
  "Kensa Sloshing Machine",
  "Bloblobber",
  "Bloblobber Deco",
  "Explosher",
  "Custom Explosher",
] as const;

const splatlings = [
  "Mini Splatling",
  "Zink Mini Splatling",
  "Kensa Mini Splatling",
  "Heavy Splatling",
  "Hero Splatling Replica",
  "Heavy Splatling Deco",
  "Heavy Splatling Remix",
  "Hydra Splatling",
  "Custom Hydra Splatling",
  "Ballpoint Splatling",
  "Ballpoint Splatling Nouveau",
  "Nautilus 47",
  "Nautilus 79",
] as const;

const dualies = [
  "Dapple Dualies",
  "Dapple Dualies Nouveau",
  "Clear Dapple Dualies",
  "Splat Dualies",
  "Hero Dualie Replicas",
  "Enperry Splat Dualies",
  "Kensa Splat Dualies",
  "Glooga Dualies",
  "Glooga Dualies Deco",
  "Kensa Glooga Dualies",
  "Dualie Squelchers",
  "Custom Dualie Squelchers",
  "Dark Tetra Dualies",
  "Light Tetra Dualies",
] as const;

const brellas = [
  "Splat Brella",
  "Hero Brella Replica",
  "Sorella Brella",
  "Tenta Brella",
  "Tenta Sorella Brella",
  "Tenta Camo Brella",
  "Undercover Brella",
  "Undercover Sorella Brella",
  "Kensa Undercover Brella",
] as const;

const weaponMap = (weapon: Weapon) => ({ value: weapon, label: weapon });

export const weaponCategories = [
  {
    label: "Shooters",
    options: [...shooters, ...semiauto]
      .map(weaponMap)
      .filter((weapon) => !weapon.value.includes("Replica")),
  },
  {
    label: "Blasters",
    options: blasters
      .map(weaponMap)
      .filter((weapon) => !weapon.value.includes("Replica")),
  },
  {
    label: "Rollers",
    options: rollers
      .map(weaponMap)
      .filter((weapon) => !weapon.value.includes("Replica")),
  },
  {
    label: "Brushes",
    options: brushes
      .map(weaponMap)
      .filter((weapon) => !weapon.value.includes("Replica")),
  },
  {
    label: "Chargers",
    options: chargers
      .map(weaponMap)
      .filter((weapon) => !weapon.value.includes("Replica")),
  },
  {
    label: "Sloshers",
    options: sloshers
      .map(weaponMap)
      .filter((weapon) => !weapon.value.includes("Replica")),
  },
  {
    label: "Splatlings",
    options: splatlings
      .map(weaponMap)
      .filter((weapon) => !weapon.value.includes("Replica")),
  },
  {
    label: "Dualies",
    options: dualies
      .map(weaponMap)
      .filter((weapon) => !weapon.value.includes("Replica")),
  },
  {
    label: "Brellas",
    options: brellas
      .map(weaponMap)
      .filter((weapon) => !weapon.value.includes("Replica")),
  },
] as const;
