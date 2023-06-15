import { Cell } from "../context/GameContext";
import styles from "./GameMap.module.css";

export default function GameMap({ map }: { map: Cell[][] }) {
  return (
    <div className={styles.map}>
      {map.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, cellIndex) => {
              let style = styles.cell;

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
