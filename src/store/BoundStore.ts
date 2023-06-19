import { create } from "zustand";
import {
  EngineActionSlice,
  createEngineActionSlice,
} from "./EngineActionSlice";
import { GameLoreSlice, createGameLoreSlice } from "./GameLoreSlice";
import { PlayerSlice, createPlayerSlice } from "./PlayerSlice";

const useBoundStore = create<EngineActionSlice & GameLoreSlice & PlayerSlice>(
  (...a) => ({
    ...createEngineActionSlice(...a),
    ...createGameLoreSlice(...a),
    ...createPlayerSlice(...a),
  })
);

export default useBoundStore;
