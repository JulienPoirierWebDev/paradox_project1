import { useState, useEffect } from "react";
import Game from "../pages/Game";
import Game_over from "../pages/Game_over";
import Menu from "../pages/Menu";
import { GameStates } from "../utils/gameStates";

export default function Page() {

    const [gameState, setGameState] = useState(GameStates.Game);


    useEffect(() => {
      console.log(gameState);
    }, [gameState])
  
    useEffect(() => {
      console.log("App render");
    }, [])
  
  return (
    <>
        {gameState === GameStates.Menu ? <Menu setGameState={setGameState} /> : null}

        {gameState === GameStates.Game ? <Game gameState={gameState} setGameState={setGameState}/> : null}

        {gameState === GameStates.Game_over ? <Game_over setGameState={setGameState}/> : null}
    </>
  )
}
