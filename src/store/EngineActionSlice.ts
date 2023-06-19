import { engine } from "@thetinyspark/paradox";
import { StateCreator } from "zustand";
import { data } from "../utils/gameData";
import { BoundStore } from "./BoundStore";
import { CreateCityBuildingType } from "@thetinyspark/paradox/dist/core/model/types/CreateCityBuildingType";

export type EngineActionSlice = {
  doCycle: () => void;
  reset: () => void;
  build: (id: number) => void;
};

export const createEngineActionSlice: StateCreator<
  BoundStore,
  [],
  [],
  EngineActionSlice
> = (set, get) => ({
  doCycle: () => {
    engine.doCycle();
  },
  reset: () => {
    engine.reset();
    engine.restoreGameData(data);
  },
  build: (id: number) => {
    const { player } = get();
    const cityID = player?.id ?? 0;

    const data: CreateCityBuildingType = {
      cityID: cityID,
      tplID: id,
    };

    engine.buyBuilding(data);
  },
});
