import { Ressource, Wallet } from "../type";
import RessourceQuantity from "./RessourceQuantity";

export default function RessourceList({ressources, wallet} : {ressources: Ressource[], wallet: Wallet}) {
    
    const ressourceQuantityArr: JSX.Element[] = [];

    ressources.map((ressource) => {
        const ressourceInWallet = wallet.find((ressourceQuantity) => ressourceQuantity.id === ressource.id);
        if (ressourceInWallet) {
            ressourceQuantityArr.push(<RessourceQuantity key={ressource.id} name={ressource.name} amount={ressourceInWallet.amount}/>);
        }
    })

    return (
    <ul>
        {ressourceQuantityArr.map((ressourceQuantity) => ressourceQuantity)}

</ul>  )
}
