import useBoundStore from "../store/BoundStore";
import { GameStates } from "../utils/gameStates";

export default function Game_over({
  setGameState,
}: {
  setGameState: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { reset, getWalletFromEngine } = useBoundStore();
  function handleClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    event.preventDefault();
    reset();
    getWalletFromEngine();

    setGameState(GameStates.Menu);
  }

  return <div onClick={handleClick}>Game_over</div>;
}
