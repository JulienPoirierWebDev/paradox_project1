import Resource from "@thetinyspark/paradox/dist/core/model/schema/resources/Resource";
import RessourceQuantity from "./RessourceQuantity";
import Quantity from "@thetinyspark/paradox/dist/core/model/schema/resources/Quantity";

export default function RessourceList({
  resources,
  wallet,
}: {
  resources: Resource[];
  wallet: Quantity[] | undefined;
}) {
  const ressourceQuantityArr: JSX.Element[] = [];

  resources.map((resource) => {
    wallet?.map((ressourceQuantity) => {
      if (ressourceQuantity.resourceID === resource.id) {
        ressourceQuantityArr.push(
          <RessourceQuantity
            key={resource.id}
            id={resource.id}
            name={resource.name}
            amount={ressourceQuantity.amount}
          />
        );
      }
    });
  });

  return (
    <ul>
      {ressourceQuantityArr.map((ressourceQuantity) => ressourceQuantity)}
    </ul>
  );
}
