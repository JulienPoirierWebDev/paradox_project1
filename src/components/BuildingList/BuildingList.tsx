import TemplateBuilding from "@thetinyspark/paradox/dist/core/model/schema/building/TemplateBuilding";
import useBoundStore from "../../store/BoundStore";
import { useRessources } from "../../hooks/useRessources";
import styles from "./BuildingList.module.css";

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

  function handleConstruct(building: TemplateBuilding): void {
    setTileSelected({ x: null, y: null });
    setCurrentAction("build");
    setTemplateBuildingIdToBuild(building.id);
  }

  const buildingHtml = playerBuildings.map((building) => {
    let buildingSpan = null;

    if (!isEnoughRessourcesToBuild(building.id, productionUnits, wallet)) {
      buildingSpan = (
        <span className={`${styles.building_span} ${styles.disable}`}>
          Construire
        </span>
      );
    } else {
      buildingSpan = (
        <span
          className={`${styles.building_span} ${styles.enable}`}
          onClick={() => {
            handleConstruct(building);
          }}
        >
          Construire
        </span>
      );
    }

    return (
      <div className={styles.building_item}>
        <div>
          <img className={styles.img} src={`src/assets/${building.id}.png`} />
          <p className={styles.name} key={building.id}>
            {" "}
            {building.name}
          </p>
        </div>
        <div>
          <p> {buildingSpan}</p>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.buildings_container}>
      {buildingHtml}
      {currentAction === "build" ? (
        <p>Choisissez une case sur laquelle construire</p>
      ) : null}
    </div>
  );
}
