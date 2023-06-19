import { engine } from "@thetinyspark/paradox";
import { StateCreator } from "zustand";
import { data } from "../assets/data2";
import { BoundStore } from "./BoundStore";

export type EngineActionSlice = {
  doCycle: () => void;
  reset: () => void;
};

export const createEngineActionSlice: StateCreator<
  BoundStore,
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
