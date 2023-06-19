import { engine } from "@thetinyspark/paradox";
import City from "@thetinyspark/paradox/dist/core/model/schema/city/City";
import Quantity from "@thetinyspark/paradox/dist/core/model/schema/resources/Quantity";
import { StateCreator } from "zustand";
import { EngineActionSlice } from "./EngineActionSlice";
import { GameLoreSlice } from "./GameLoreSlice";
import { Cell } from "../type";

export type PlayerSlice = {
  player: City | undefined;
  wallet: Quantity[] | undefined;
  setPlayer: (player: City | undefined) => void;
  setWallet: (wallet: Quantity[] | undefined) => void;
  getPlayerFromEngine: () => void;
  getWalletFromEngine: () => void;
  gameMap: Cell[][];
  isFirstLoad: boolean;
  setGameMap: (gameMap: Cell[][]) => void;
  setIsFirstLoad: (isFirstLoad: boolean) => void;
  initialiseMap: () => void;
};

export const createPlayerSlice: StateCreator<
  EngineActionSlice & GameLoreSlice & PlayerSlice,
  [],
  [],
  PlayerSlice
> = (set, get) => ({
  player: undefined,
  wallet: undefined,
  setPlayer: (player) => set({ player }),
  setWallet: (wallet) => set({ wallet }),
  getPlayerFromEngine: async () => {
    const cities = await engine.getCities();
    set({ player: cities[0] });
  },
  getWalletFromEngine: async () => {
    const cities = await engine.getCities();
    set({ wallet: cities[0].wallet.clone().get() });
  },
  gameMap: [],
  isFirstLoad: true,
  setGameMap: (gameMap) => set({ gameMap }),
  setIsFirstLoad: (isFirstLoad) => set({ isFirstLoad }),
  initialiseMap: () => {
    const { player, isFirstLoad } = get();
    if (isFirstLoad) {
      set({ isFirstLoad: false });
      const newMap: Cell[][] = [];
      for (let i = 0; i < 32; i++) {
        newMap.push([]);
        for (let j = 0; j < 32; j++) {
          newMap[i].push({
            buildingId: -1,
            templateBuilding: -1,
          });
        }
      }
      player?.buildings.forEach((building) => {
        const x = Math.round(Math.random() * 32);
        const y = Math.round(Math.random() * 32);
        newMap[x][y] = {
          buildingId: building.id,
          templateBuilding: building.tplBuildingID,
        };
      });
      set({ gameMap: newMap });
    }
  },
});
