import { engine } from "@thetinyspark/paradox";
import { StateCreator } from "zustand";
import { data } from "../assets/data2";
import { PlayerSlice } from "./PlayerSlice";
import { GameLoreSlice } from "./GameLoreSlice";

export type EngineActionSlice = {
  doCycle: () => void;
  reset: () => void;
};

export const createEngineActionSlice: StateCreator<
  EngineActionSlice & GameLoreSlice & PlayerSlice,
  [],
  [],
  EngineActionSlice
> = () => ({
  doCycle: () => {
    engine.doCycle();
  },
  reset: () => {
    engine.reset();
    engine.restoreGameData(data);
  },
});
