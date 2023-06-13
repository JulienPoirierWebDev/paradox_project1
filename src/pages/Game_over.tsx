import { useGameContext } from "../hooks/UseGameContext";
import { GameStates } from "../utils/gameStates";

export default function Game_over({setGameState} : {setGameState: React.Dispatch<React.SetStateAction<number>>}) {
    const {reset} = useGameContext();
    function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.preventDefault();
        reset();
        setGameState(GameStates.Menu)
    }

  return (
    <div onClick={handleClick}>Game_over</div>
  )
}
