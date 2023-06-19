import { create } from "zustand";
import {
  EngineActionSlice,
  createEngineActionSlice,
} from "./EngineActionSlice";
import { GameLoreSlice, createGameLoreSlice } from "./GameLoreSlice";
import { PlayerSlice, createPlayerSlice } from "./PlayerSlice";
import { UserActionSlice, createUserActionSlice } from "./UserActionSlice";

export type BoundStore = EngineActionSlice &
  GameLoreSlice &
  PlayerSlice &
  UserActionSlice;

const useBoundStore = create<BoundStore>((...a) => ({
  ...createEngineActionSlice(...a),
  ...createGameLoreSlice(...a),
  ...createPlayerSlice(...a),
  ...createUserActionSlice(...a),
}));

export default useBoundStore;
