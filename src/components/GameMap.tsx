import { Cell } from "../type";
import styles from "./GameMap.module.css";
import useBoundStore from "../store/BoundStore";
import { useRessources } from "../hooks/useRessources";
import { useRef, useState } from "react";

export default function GameMap({ map }: { map: Cell[][] }) {
  const {
    tileSelected,
    ressources,
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

  const mapRef = useRef<HTMLDivElement>(null);

  const [coordinate, setCoordinate] = useState<{ x: number; y: number }>({
    x: -1,
    y: -1,
  });

  const [hoverInfo, setHoverInfo] = useState<JSX.Element | null>(null);

  const { isEnoughRessourcesToBuild } = useRessources();

  const handleClick = (cellIndex: number, rowIndex: number) => {
    {
      setTileSelected({ x: cellIndex, y: rowIndex });

      const isTemplateBuildingIdToBuild =
        templateBuildingIdToBuild === -1 || !templateBuildingIdToBuild;

      if (isTemplateBuildingIdToBuild) {
        return;
      }

      const isNotEnoughRessources = !isEnoughRessourcesToBuild(
        templateBuildingIdToBuild,
        productionUnits,
        wallet
      );

      if (!nextBuildingId && isNotEnoughRessources) {
        return;
      }

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
  };

  const handleMouseEnter = (cellIndex: number, rowIndex: number) => {
    setTileOver({ x: cellIndex, y: rowIndex });
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
                handleMouseEnter(cellIndex, rowIndex);
                const templateBuilding = productionUnits.find(
                  (productionUnit) =>
                    productionUnit.id === cell.templateBuilding
                );

                let production = "";

                templateBuilding?.levels
                  .find((level) => level.level === 1)
                  ?.prod.get()
                  .forEach((ressource) => {
                    const ressourceName = ressources.find(
                      (ressourceName) =>
                        ressourceName.id === ressource.resourceID
                    )?.name;
                    production += `${ressourceName}: ${ressource.amount} `;
                  });

                let consumption = "";

                templateBuilding?.levels
                  .find((level) => level.level === 1)
                  ?.cons.get()
                  .forEach((ressource) => {
                    const ressourceName = ressources.find(
                      (ressourceName) =>
                        ressourceName.id === ressource.resourceID
                    )?.name;
                    consumption += `${ressourceName}: ${ressource.amount} `;
                  });

                const tplName = productionUnits.find(
                  (productionUnit) =>
                    productionUnit.id === cell.templateBuilding
                )?.name;

                setHoverInfo(
                  <div>
                    <div>{tplName}</div>
                    <div>Production: {production}</div>
                    <div>Consumption: {consumption}</div>
                  </div>
                );
              }}
            >
              {building}
            </div>
          );
        })}
      </div>
    );
  });

  const handleLeaveMap = () => {
    setHoverInfo(null);
  };

  return (
    <>
      <div
        ref={mapRef}
        className={styles.map}
        onMouseMove={(event) => {
          if (!mapRef.current) return;

          const mapRect = mapRef.current.getBoundingClientRect();
          const x = event.clientX - mapRect.left - 70;
          const y = event.clientY - mapRect.top - 70;
          setCoordinate({ x, y });
        }}
        onMouseLeave={() => {
          handleLeaveMap();
        }}
      >
        {cells}
        <div
          className={styles.infos}
          style={{ left: coordinate.x, top: -50 + coordinate.y }}
        >
          {hoverInfo}
        </div>
      </div>
    </>
  );
}
