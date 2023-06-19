import { useEffect } from "react";
import { GameStates } from "../utils/gameStates";
import BuildingList from "./BuildingList";
import RessourceList from "./RessourceList";
import GameMap from "./GameMap";
import useBoundStore from "../store/BoundStore";
import { CONSTANTS } from "../utils/gameData";

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
      <p>Paradox game test</p>
      <h2>{player?.name}</h2>
      {player ? <RessourceList resources={ressources} wallet={wallet} /> : null}
      <h2>Buildings to build</h2>
      <BuildingList buildings={productionUnits} />

      {player ? (
        <>
          <div>
            <h2>Buildings</h2>
            <p>
              {player.buildings.map((building) => {
                return (
                  <p>
                    {building.id} || {building.name} || {building.tplBuildingID}
                  </p>
                );
              })}
            </p>
          </div>
          <div>
            <h2>Map</h2>

            <GameMap map={gameMap} />
          </div>
        </>
      ) : null}
    </div>
  );
}
