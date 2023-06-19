import { StateCreator } from "zustand";
import { PlayerSlice } from "./PlayerSlice";
import { engine } from "@thetinyspark/paradox";
import TemplateBuilding from "@thetinyspark/paradox/dist/core/model/schema/building/TemplateBuilding";
import Resource from "@thetinyspark/paradox/dist/core/model/schema/resources/Resource";
import { EngineActionSlice } from "./EngineActionSlice";

export type GameLoreSlice = {
  ressources: Resource[];
  productionUnits: TemplateBuilding[];
  getRessourcesFromEngine: () => void;
  getProductionUnitsFromEngine: () => void;
};

export const createGameLoreSlice: StateCreator<
  EngineActionSlice & GameLoreSlice & PlayerSlice,
  [],
  [],
  GameLoreSlice
> = (set) => ({
  ressources: [],
  productionUnits: [],
  getRessourcesFromEngine: async () => {
    const ressources = await engine.getResources();
    console.log(ressources);

    set({ ressources });
  },
  getProductionUnitsFromEngine: async () => {
    const productionUnits = await engine.getTemplateBuildings();
    set({ productionUnits });
  },
});
