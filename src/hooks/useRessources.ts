import TemplateBuilding from "@thetinyspark/paradox/dist/core/model/schema/building/TemplateBuilding";
import Quantity from "@thetinyspark/paradox/dist/core/model/schema/resources/Quantity";

export const useRessources = () => {
  const isEnoughRessourcesToBuild = (
    tplID: number,
    productionUnits: TemplateBuilding[],
    wallet: Quantity[] | undefined
  ) => {
    const tplBuilding = productionUnits.filter((p) => p.id === tplID)[0];
    const tplBuildingCost = tplBuilding.levels[0].cost.get();

    let enoughRessources = true;

    tplBuildingCost.forEach((cost) => {
      const ressource = wallet?.filter(
        (element) => element.resourceID === cost.resourceID
      );
      if (ressource && ressource[0].amount < cost.amount) {
        enoughRessources = false;
      }
    });

    return enoughRessources;
  };

  return { isEnoughRessourcesToBuild };
};
