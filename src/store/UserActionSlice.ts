import { StateCreator } from "zustand";
import { BoundStore } from "./BoundStore";
import { Tile } from "../type";

export type UserActionSlice = {
  nextBuildingId: number;
  incrementNextBuildingId: () => void;
  tileSelected: Tile;
  setTileSelected: (tile: Tile) => void;
  currentAction: "build" | "move";
  setCurrentAction: (action: "build" | "move") => void;
  templateBuildingIdToBuild: number | null;
  setTemplateBuildingIdToBuild: (id: number | null) => void;
};

export const createUserActionSlice: StateCreator<
  BoundStore,
  [],
  [],
  UserActionSlice
> = (set) => ({
  nextBuildingId: 2,
  incrementNextBuildingId: () =>
    set((state) => ({ nextBuildingId: state.nextBuildingId + 1 })),
  tileSelected: {
    x: null,
    y: null,
  },
  setTileSelected: (tileSelected) => set({ tileSelected }),
  currentAction: "move",
  setCurrentAction: (currentAction) => set({ currentAction }),
  templateBuildingIdToBuild: null,
  setTemplateBuildingIdToBuild: (templateBuildingIdToBuild) =>
    set({ templateBuildingIdToBuild }),
});
