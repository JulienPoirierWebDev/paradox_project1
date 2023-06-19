import { Cell } from "../type";
import styles from "./GameMap.module.css";
import useBoundStore from "../store/BoundStore";

export default function GameMap({ map }: { map: Cell[][] }) {
  const {
    tileSelected,
    setTileSelected,
    templateBuildingIdToBuild,
    setCurrentAction,
    build,
    nextBuildingId,
    updateTileMap,
    wallet,
    productionUnits,
  } = useBoundStore();

  const handleClick = (cellIndex: number, rowIndex: number) => {
    {
      console.log("Clicked cell", cellIndex, rowIndex);
      setTileSelected({ x: cellIndex, y: rowIndex });
      if (templateBuildingIdToBuild !== -1) {
        console.log(
          "Building",
          templateBuildingIdToBuild,
          "on cell",
          cellIndex,
          rowIndex
        );

        console.log("newBuilding", nextBuildingId, templateBuildingIdToBuild);
        if (
          templateBuildingIdToBuild &&
          nextBuildingId &&
          isEnoughRessourcesToBuild(templateBuildingIdToBuild)
        ) {
          build(templateBuildingIdToBuild);

          updateTileMap(
            { x: rowIndex, y: cellIndex },
            nextBuildingId,
            templateBuildingIdToBuild
          );
        }

        setCurrentAction("move");
        setTileSelected({ x: null, y: null });
      }
    }
  };

  const isEnoughRessourcesToBuild = (tplID: number) => {
    const tplBuilding = productionUnits.filter((p) => p.id === tplID)[0];
    const tplBuildingCost = tplBuilding.levels[0].cost.get();

    let enoughRessources = true;

    tplBuildingCost.forEach((cost) => {
      const ressource = wallet?.filter(
        (element) => element.resourceID === cost.resourceID
      );
      if (ressource && ressource[0].amount < cost.amount) {
        enoughRessources = false;
      }
    });

    return enoughRessources;
  };

  const cells = map.map((row, rowIndex) => {
    return (
      <div key={rowIndex} className={styles.row}>
        {row.map((cell, cellIndex) => {
          let style = styles.cell;

          if (tileSelected?.x === cellIndex && tileSelected?.y === rowIndex) {
            style += " " + styles.clicked;
          }

          if (cell.buildingId === -1) {
            style += " " + styles.empty;
          }

          let building = "";

          if (cell.templateBuilding === 1) {
            building = "B";
          } else if (cell.templateBuilding === 2) {
            building = "O";
          } else if (cell.templateBuilding === 4) {
            building = "C";
          } else if (cell.templateBuilding === 5) {
            building = "G";
          }

          return (
            <div
              key={cellIndex}
              className={style}
              onClick={() => handleClick(cellIndex, rowIndex)}
            >
              {building}
            </div>
          );
        })}
      </div>
    );
  });
  return <div className={styles.map}>{cells}</div>;
}
