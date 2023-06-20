import { Cell } from "../type";
import styles from "./GameMap.module.css";
import useBoundStore from "../store/BoundStore";
import { useRessources } from "../hooks/useRessources";

export default function GameMap({ map }: { map: Cell[][] }) {
  const {
    tileSelected,
    setTileSelected,
    templateBuildingIdToBuild,
    setTemplateBuildingIdToBuild,
    setCurrentAction,
    build,
    nextBuildingId,
    updateTileMap,
    wallet,
    productionUnits,
    setTileOver,
    tileOver,
  } = useBoundStore();

  const { isEnoughRessourcesToBuild } = useRessources();

  const handleClick = (cellIndex: number, rowIndex: number) => {
    {
      setTileSelected({ x: cellIndex, y: rowIndex });
      if (templateBuildingIdToBuild !== -1) {
        console.log(
          "Building",
          templateBuildingIdToBuild,
          "on cell",
          cellIndex,
          rowIndex
        );

        if (
          templateBuildingIdToBuild &&
          nextBuildingId &&
          isEnoughRessourcesToBuild(
            templateBuildingIdToBuild,
            productionUnits,
            wallet
          )
        ) {
          build(templateBuildingIdToBuild);

          updateTileMap(
            { x: rowIndex, y: cellIndex },
            nextBuildingId,
            templateBuildingIdToBuild
          );

          setCurrentAction("move");
          setTileSelected({ x: null, y: null });
          setTemplateBuildingIdToBuild(-1);
        }
      }
    }
  };

  const cells = map.map((row, rowIndex) => {
    return (
      <div key={rowIndex} className={styles.row}>
        {row.map((cell, cellIndex) => {
          let style = styles.cell;

          if (tileSelected?.x === cellIndex && tileSelected?.y === rowIndex) {
            style += " " + styles.clicked;
          }

          if (tileOver?.x === cellIndex && tileOver?.y === rowIndex) {
            style += " " + styles.over;
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
              onMouseEnter={() => {
                setTileOver({ x: cellIndex, y: rowIndex });
              }}
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
