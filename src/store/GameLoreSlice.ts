import { StateCreator } from "zustand";
import { engine } from "@thetinyspark/paradox";
import TemplateBuilding from "@thetinyspark/paradox/dist/core/model/schema/building/TemplateBuilding";
import Resource from "@thetinyspark/paradox/dist/core/model/schema/resources/Resource";
import { BoundStore } from "./BoundStore";

export type GameLoreSlice = {
  ressources: Resource[];
  productionUnits: TemplateBuilding[];
  getRessourcesFromEngine: () => void;
  getProductionUnitsFromEngine: () => void;
};

export const createGameLoreSlice: StateCreator<
  BoundStore,
  [],
  [],
  GameLoreSlice
> = (set) => ({
  ressources: [],
  productionUnits: [],
  getRessourcesFromEngine: async () => {
    const ressources = await engine.getResources();
    set({ ressources });
  },
  getProductionUnitsFromEngine: async () => {
    const productionUnits = await engine.getTemplateBuildings();
    set({ productionUnits });
  },
});
