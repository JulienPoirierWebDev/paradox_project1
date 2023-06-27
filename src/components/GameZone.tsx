import { useEffect } from "react";
import { GameStates } from "../utils/gameStates";
import BuildingList from "./BuildingList/BuildingList";
import GameMap from "./GameMap/GameMap";
import useBoundStore from "../store/BoundStore";
import { CONSTANTS } from "../utils/gameData";
import RessourceList from "./Resource/RessourceList";

export default function GameZone({
  gameState,
  setGameState,
  isFirstLoad,
  setIsFirstLoad,
}: {
  gameState: number;
  setGameState: React.Dispatch<React.SetStateAction<number>>;
  isFirstLoad: boolean;
  setIsFirstLoad: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    doCycle,
    getPlayerFromEngine,
    getWalletFromEngine,
    getRessourcesFromEngine,
    getProductionUnitsFromEngine,
    wallet,
    player,
    ressources,
    productionUnits,
    gameMap,
    initialiseMap,
  } = useBoundStore();

  useEffect(() => {
    const doCycleInterval = setInterval(() => {
      doCycle();
      getWalletFromEngine();
      getPlayerFromEngine();
    }, CONSTANTS.CYCLE_DURATION);

    return () => {
      clearInterval(doCycleInterval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  useEffect(() => {
    getRessourcesFromEngine();
    getProductionUnitsFromEngine();
  }, [getRessourcesFromEngine, getProductionUnitsFromEngine]);

  useEffect(() => {
    wallet?.map((ressourceQuantity) => {
      if (ressourceQuantity.resourceID === 1 && ressourceQuantity.amount < 0) {
        setGameState(GameStates.Game_over);
      }
    });
  }, [wallet, setGameState]);

  useEffect(() => {
    if (player && isFirstLoad) {
      console.log("First load done");

      setIsFirstLoad(false);
      initialiseMap();
    }
  }, [player, isFirstLoad, setIsFirstLoad, initialiseMap]);

  return (
    <div>
      <div className="UI-section">
        <h2 className="title">Resources</h2>
        {player ? (
          <RessourceList resources={ressources} wallet={wallet} />
        ) : null}
      </div>
      <div className="UI-section">
        <h2>Build</h2>
        <BuildingList buildings={productionUnits} />
      </div>

      {player ? (
        <>
          <div>
            <h2>Map</h2>

            <GameMap map={gameMap} />
          </div>
        </>
      ) : null}
    </div>
  );
}
