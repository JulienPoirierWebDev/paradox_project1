import React from 'react'
import { GameStates } from '../utils/gameStates';

export default function Menu({setGameState} : {setGameState: React.Dispatch<React.SetStateAction<number>>}) {
    function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.preventDefault();
        setGameState(GameStates.Game)
    }

  return (
    <div onClick={handleClick}>Menu</div>
  )
}
