import Resource from "@thetinyspark/paradox/dist/core/model/schema/resources/Resource";
import RessourceQuantity from "./RessourceQuantity";
import Quantity from "@thetinyspark/paradox/dist/core/model/schema/resources/Quantity";
import styles from "./RessourceList.module.css";

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
    <ul className={styles.ressourceList}>
      {ressourceQuantityArr.map((ressourceQuantity) => ressourceQuantity)}
    </ul>
  );
}
