import { useState } from "react";
import GameZone from "../components/GameZone";
import { GameStates } from "../utils/gameStates";
import styles from "./Game.module.css";

export default function Game({
  gameState,
  setGameState,
}: {
  gameState: number;
  setGameState: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  function handleGoToMenu(
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ): void {
    event.preventDefault();
    setGameState(GameStates.Menu);
  }

  return (
    <div className={styles.container}>
      <h1>Surviving Mars</h1>
      <p onClick={handleGoToMenu}>Go to menu</p>
      <GameZone
        gameState={gameState}
        setGameState={setGameState}
        isFirstLoad={isFirstLoad}
        setIsFirstLoad={setIsFirstLoad}
      />
    </div>
  );
}
