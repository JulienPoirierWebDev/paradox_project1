import {useEffect } from 'react'
import BuildingList from '../components/BuildingList';
import RessourceList from '../components/RessourceList';
import { GameStates } from '../utils/gameStates';
import "./Game.css"
import { useGameContext } from '../hooks/UseGameContext';

export default function Game({gameState, setGameState}: {gameState: number, setGameState: React.Dispatch<React.SetStateAction<number>>}) {  
    
    const { doCycle, getPlayer, getWallet, wallet, player, ressources, productionUnits} = useGameContext();

    useEffect(() => {
        console.log("Ok Game");
        
    const doCycleInterval = setInterval(() => {
    doCycle();
    getPlayer();
    getWallet();  
    }, 100);

    return () => {
    clearInterval(doCycleInterval);
    }





    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState]);

    useEffect(() => {
        //console.log("Ok Game 2");
        
    wallet?.map((ressourceQuantity) => {
    if (ressourceQuantity.resourceID === 1 && ressourceQuantity.amount < 0) {
        setGameState(GameStates.Game_over);
    }
    })
    }, [wallet, setGameState])

    function handleGoToMenu(event: React.MouseEvent<HTMLParagraphElement, MouseEvent>): void {
        event.preventDefault();
        setGameState(GameStates.Menu);
    }

    //console.log("Ok game 3");
    

    return (
    <div className={"container"}>
        <h1>Game</h1>
        <p onClick={handleGoToMenu}>Go to menu</p>
        <p>Paradox game test</p>
        <h2>{player?.name}</h2>
        {player ? <RessourceList resources={ressources} wallet={wallet}/> : null}
        <h2>Buildings to build</h2>
        <BuildingList buildings={productionUnits}/>
    </div>
    )
}
