import styles from "./HoverTileInfo.module.css";

export default function HoverTileInfo({
  coordinate,
  hoverInfo,
}: {
  coordinate: { x: number; y: number };
  hoverInfo: JSX.Element | null;
}) {
  return (
    <div
      className={styles.infos}
      style={{ left: coordinate.x, top: -50 + coordinate.y }}
    >
      {hoverInfo}
    </div>
  );
}
