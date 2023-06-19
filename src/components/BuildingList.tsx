import TemplateBuilding from "@thetinyspark/paradox/dist/core/model/schema/building/TemplateBuilding";
import useBoundStore from "../store/BoundStore";

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
  } = useBoundStore();

  const constructableId = [2, 3, 4, 5];

  const constructableBuildings = buildings.filter((building) => {
    return constructableId.includes(building.id);
  });

  function handleConstruct(building: TemplateBuilding): void {
    setTileSelected({ x: null, y: null });
    setCurrentAction("build");
    setTemplateBuildingIdToBuild(building.id);
  }

  return (
    <div>
      {constructableBuildings.map((building) => {
        return (
          <>
            <p key={building.id}>
              {building.name} -{" "}
              <span
                onClick={() => {
                  handleConstruct(building);
                }}
              >
                Construire
              </span>
            </p>
          </>
        );
      })}
      {currentAction === "build" ? (
        <p>Choisissez une case sur laquelle construire</p>
      ) : null}
    </div>
  );
}
