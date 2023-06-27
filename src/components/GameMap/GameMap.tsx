import { Cell } from "../../type";
import styles from "./GameMap.module.css";
import { useRef, useState } from "react";
import HoverTileInfo from "../HoverTileInfo/HoverTileInfo";
import Tile from "../Tile/Tile";

export default function GameMap({ map }: { map: Cell[][] }) {
  const mapRef = useRef<HTMLDivElement>(null);

  const [coordinate, setCoordinate] = useState<{ x: number; y: number }>({
    x: -1,
    y: -1,
  });

  const [hoverInfo, setHoverInfo] = useState<JSX.Element | null>(null);

  const cells = map.map((row, rowIndex) => {
    return <Tile row={row} rowIndex={rowIndex} setHoverInfo={setHoverInfo} />;
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
        <HoverTileInfo coordinate={coordinate} hoverInfo={hoverInfo} />
      </div>
    </>
  );
}
