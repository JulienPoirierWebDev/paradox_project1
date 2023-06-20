import TemplateBuilding from "@thetinyspark/paradox/dist/core/model/schema/building/TemplateBuilding";
import useBoundStore from "../store/BoundStore";
import { useRessources } from "../hooks/useRessources";

export default function BuildingList({
  buildings,
}: {
  buildings: TemplateBuilding[];
}) {
  const {
    setTileSelected,
    setCurrentAction,
    currentAction,
    setTemplateBuildingIdToBuild,
    productionUnits,
    wallet,
  } = useBoundStore();

  const { isEnoughRessourcesToBuild } = useRessources();

  const constructableId = [2, 3, 4, 5];

  const playerBuildings = buildings.filter((building) => {
    return constructableId.includes(building.id);
  });

  const constructableBuildingsId = buildings.filter((building) => {
    if (!constructableId.includes(building.id)) {
      return;
    }

    const isEnoughRessources = isEnoughRessourcesToBuild(
      building.id,
      productionUnits,
      wallet
    );

    if (isEnoughRessources) {
      return building;
    }
  });

  function handleConstruct(building: TemplateBuilding): void {
    setTileSelected({ x: null, y: null });
    setCurrentAction("build");
    setTemplateBuildingIdToBuild(building.id);
  }

  const buildingHtml = playerBuildings.map((building) => {
    return (
      <p key={building.id}>
        {building.name}
        {constructableBuildingsId.includes(building) ? (
          <>
            -{" "}
            <span
              onClick={() => {
                handleConstruct(building);
              }}
            >
              Construire
            </span>
          </>
        ) : null}
      </p>
    );
  });

  return (
    <div>
      {buildingHtml}
      {currentAction === "build" ? (
        <p>Choisissez une case sur laquelle construire</p>
      ) : null}
    </div>
  );
}
