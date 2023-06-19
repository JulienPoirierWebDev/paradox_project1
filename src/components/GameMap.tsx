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
  } = useBoundStore();
  return (
    <div className={styles.map}>
      {map.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, cellIndex) => {
              let style = styles.cell;

              if (
                tileSelected?.x === cellIndex &&
                tileSelected?.y === rowIndex
              ) {
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
                  onClick={() => {
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

                      const newBuilding = templateBuildingIdToBuild
                        ? build(templateBuildingIdToBuild)
                        : null;

                      console.log(
                        "newBuilding",
                        nextBuildingId,
                        templateBuildingIdToBuild
                      );
                      if (templateBuildingIdToBuild && nextBuildingId) {
                        updateTileMap(
                          { x: rowIndex, y: cellIndex },
                          nextBuildingId,
                          templateBuildingIdToBuild
                        );
                      }

                      console.log("newBuilding", newBuilding);

                      setCurrentAction("move");
                      setTileSelected({ x: null, y: null });
                    }
                  }}
                >
                  {building}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
