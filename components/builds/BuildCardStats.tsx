import { Link } from "@reach/router";
import React from "react";
import { RiTShirtAirLine } from "react-icons/ri";
import useAbilityEffects from "../../frontend-react/src/hooks/useAbilityEffects";
import { AnalyzerBuild, Build } from "../../frontend-react/src/types";
import BuildStats from "../analyzer/BuildStats";
import Button from "../elements/Button";
import Modal from "../elements/Modal";
import ViewSlots from "./ViewSlots";

interface BuildCardStatsProps {
  build: Build;
  closeModal: () => void;
}

const unchangingBonus = {};

const BuildCardStats: React.FC<BuildCardStatsProps> = ({
  build,
  closeModal,
}) => {
  const explanations = useAbilityEffects(build, unchangingBonus, 0);

  const defaultBuild: AnalyzerBuild = {
    weapon: build.weapon,
    headgear: ["UNKNOWN", "UNKNOWN", "UNKNOWN", "UNKNOWN"],
    clothing: ["UNKNOWN", "UNKNOWN", "UNKNOWN", "UNKNOWN"],
    shoes: ["UNKNOWN", "UNKNOWN", "UNKNOWN", "UNKNOWN"],
  };
  const zeroExplanations = useAbilityEffects(defaultBuild, unchangingBonus, 0);

  const strippedBuild = {
    weapon: build.weapon,
    headgear: build.headgear,
    clothing: build.clothing,
    shoes: build.shoes,
  };
  const queryParam = new URLSearchParams(strippedBuild as any).toString();

  return (
    <Modal
      title={`Stats of ${build.weapon} build by ${
        build.discord_user!.username
      }`}
      closeModal={closeModal}
      closeOnOutsideClick
    >
      <ViewSlots build={build} />
      <Link to={`/analyzer?${queryParam}`}>
        <Button icon={<RiTShirtAirLine />} outlined mt="1em">
          Show in build analyzer
        </Button>
      </Link>
      <BuildStats
        build={build}
        explanations={explanations}
        otherExplanations={zeroExplanations}
      />
    </Modal>
  );
};

export default BuildCardStats;
