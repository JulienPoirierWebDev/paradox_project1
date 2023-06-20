import { engine } from "@thetinyspark/paradox";
import City from "@thetinyspark/paradox/dist/core/model/schema/city/City";
import Quantity from "@thetinyspark/paradox/dist/core/model/schema/resources/Quantity";
import { StateCreator } from "zustand";
import { Cell, Tile } from "../type";
import { BoundStore } from "./BoundStore";
import { CONSTANTS } from "../utils/gameData";

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
  updateTileMap: (
    tile: Tile,
    buildingID: number,
    tplBuildingID: number
  ) => void;
};

export const createPlayerSlice: StateCreator<
  BoundStore,
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
      for (let i = 0; i < CONSTANTS.MAP_SIZE; i++) {
        newMap.push([]);
        for (let j = 0; j < CONSTANTS.MAP_SIZE; j++) {
          newMap[i].push({
            buildingId: -1,
            templateBuilding: -1,
          });
        }
      }
      player?.buildings.forEach((building) => {
        const x = Math.round(Math.random() * CONSTANTS.MAP_SIZE);
        const y = Math.round(Math.random() * CONSTANTS.MAP_SIZE);
        newMap[x][y] = {
          buildingId: building.id,
          templateBuilding: building.tplBuildingID,
        };
      });
      set({ gameMap: newMap });
    }
  },
  updateTileMap: (tile: Tile, buildingID: number, tplID: number) => {
    console.log("updateTileMap");
    const { gameMap } = get();

    const newMap: Cell[][] = gameMap;
    console.log(tile);

    if (tile.x !== null && tile.y !== null) {
      newMap[tile.x][tile.y] = {
        buildingId: buildingID,
        templateBuilding: tplID,
      };
    }

    set({ gameMap: newMap });
  },
});
