import * as Paradox from "@thetinyspark/paradox";
import TemplateBuilding from "@thetinyspark/paradox/dist/core/model/schema/building/TemplateBuilding";
import City from "@thetinyspark/paradox/dist/core/model/schema/city/City";
import Quantity from "@thetinyspark/paradox/dist/core/model/schema/resources/Quantity";
import Resource from "@thetinyspark/paradox/dist/core/model/schema/resources/Resource";
import React, { useCallback, useState } from "react";
import { data } from "../assets/data2";

const engine = Paradox.engine;

export type Cell = {
  buildingId: number;
  templateBuilding: number;
};

export type GameContextType = {
  ressources: Resource[];
  productionUnits: TemplateBuilding[];
  player: City | undefined;
  wallet: Quantity[] | undefined;
  getRessources: () => void;
  getProductionUnits: () => void;
  getPlayer: () => void;
  getWallet: () => void;
  doCycle: () => void;
  reset: () => void;
  gameMap: Cell[][];
  initialiseMap: () => void;
};

export const GameContext = React.createContext<GameContextType | null>(null);

export default function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ressources, setRessources] = useState<Resource[]>([]);
  const [productionUnits, setProductionUnits] = useState<TemplateBuilding[]>(
    []
  );
  const [player, setPlayer] = useState<City>();
  const [wallet, setWallet] = useState<Quantity[]>();

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const createMap = useCallback(() => {
    const map: Cell[][] = [];
    for (let i = 0; i < 32; i++) {
      map.push([]);
      for (let j = 0; j < 32; j++) {
        map[i].push({
          buildingId: -1,
          templateBuilding: -1,
        });
      }
    }
    return map;
  }, []);

  const [gameMap, setGameMap] = useState(createMap());

  const firstLoadDone = () => {
    setIsFirstLoad(false);
  };

  // exemple qui permet d'obtenir la liste des ressources configurées sur le moteur
  const getRessources = useCallback(() => {
    engine.getResources().then((resources) => {
      setRessources(resources);
    });
  }, []);

  const getProductionUnits = useCallback(() => {
    engine.getTemplateBuildings().then((templates) => {
      setProductionUnits(templates);
    });
  }, []);

  const getPlayer = () => {
    engine.getCities().then((cities) => {
      setPlayer(cities[0]);
    });
  };

  const initialiseMap = () => {
    if (isFirstLoad === true) {
      firstLoadDone();
      const newMap = createMap();
      player?.buildings.forEach((building) => {
        const x = Math.round(Math.random() * 32);
        const y = Math.round(Math.random() * 32);

        newMap[x][y] = {
          buildingId: building.id,
          templateBuilding: building.tplBuildingID,
        };
      });
      setGameMap(newMap);
    }
  };

  const getWallet = () => {
    engine.getCities().then(async (cities) => {
      setWallet(cities[0].wallet.clone().get());
    });
  };

  const doCycle = () => {
    engine.doCycle();
  };

  const reset = () => {
    engine.reset();
    engine.restoreGameData(data);
  };

  getRessources();
  getProductionUnits();
  getPlayer();
  getWallet();

  const values = {
    ressources,
    productionUnits,
    player,
    wallet,
    getRessources,
    getProductionUnits,
    getPlayer,
    getWallet,
    doCycle,
    reset,
    gameMap,
    initialiseMap,
  };

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
}
