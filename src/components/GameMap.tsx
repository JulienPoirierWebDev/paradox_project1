import { Cell } from "../type";
import styles from "./GameMap.module.css";
import useBoundStore from "../store/BoundStore";

export default function GameMap({ map }: { map: Cell[][] }) {
  const { tileSelected, setTileSelected } = useBoundStore();
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
              }

              return (
                <div
                  key={cellIndex}
                  className={style}
                  onClick={() => {
                    console.log("Clicked cell", cellIndex, rowIndex);
                    setTileSelected({ x: cellIndex, y: rowIndex });
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
