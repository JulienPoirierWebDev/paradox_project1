import styles from "./RessourceQuantity.module.css";

export default function RessourceQuantity({
  id,
  name,
  amount,
}: {
  id: number;
  name: string;
  amount: number;
}) {
  return (
    <li className={styles.ressource}>
      {id + " - " + name} : {amount}
    </li>
  );
}
