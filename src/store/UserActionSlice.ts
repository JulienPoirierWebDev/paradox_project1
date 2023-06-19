import { StateCreator } from "zustand";
import { BoundStore } from "./BoundStore";
import { Tile } from "../type";

export type UserActionSlice = {
  tileSelected: Tile;
  setTileSelected: (tile: Tile) => void;
};

export const createUserActionSlice: StateCreator<
  BoundStore,
  [],
  [],
  UserActionSlice
> = (set) => ({
  tileSelected: {
    x: null,
    y: null,
  },
  setTileSelected: (tileSelected) => set({ tileSelected }),
});
