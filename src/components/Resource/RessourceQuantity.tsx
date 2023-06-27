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
    <li>
      {name} : {amount}
    </li>
  );
}
