import * as Paradox from "@thetinyspark/paradox";
import { useState } from "react";
import {data } from "./assets/data";

Paradox.engine.init(Paradox.defaultContainer, data);

type Ressource = {
  id: number
  name: string
}

type PointMaker = {
  id: number
  name: string
}

type QuantityList = {
  resourceID: number
  amount: number
}

type Player = {
  id:number,
  name:string,
  wallet:{
    _quantities:QuantityList[]}
}



function App() {

  const [ressources, setRessources] = useState<Ressource[]>([])
  const [pointMakers, setPointMakers] = useState<PointMaker[]>([])
  const [meAsAPlayer, setMeAsAPlayer] = useState<Player>()

// exemple qui permet d'obtenir la liste des ressources configurées sur le moteur
Paradox.engine.getFacade().query(Paradox.appConstants.GET_RESOURCES_QUERY).then( 
  (resources: Ressource[])=>{
      console.log(resources);  
      setRessources(resources);    
  }
)

Paradox.engine.getFacade().query(Paradox.appConstants.GET_TEMPLATES_BUILDINGS_QUERY).then(
  (templates: PointMaker[])=>{
      console.log(templates);  
      setPointMakers(templates);    
  }
)

Paradox.engine.getFacade().query(Paradox.appConstants.GET_CITIES_QUERY).then(
  (cities: Player[])=>{
      console.log(cities[0]);  
      
      setMeAsAPlayer(cities[0]);    
  }
)

  return (
    <>
      <p>Paradox game test</p>
      
      <h2>Liste des ressources dans le jeu</h2>
      <ul>
        {ressources.map((ressource) => (
          <li key={ressource.id}>{ressource.name}</li>
        ))}
      </ul>

      <h2>Liste des accumulateurs de ressources</h2>
      <ul>
        {pointMakers.map((pointMaker) => (
          <li key={pointMaker.id}>{pointMaker.name}</li>
        ))}
      </ul>

      <h2>Moi</h2>
      <ul>
        <li>{meAsAPlayer?.name}</li>
        {ressources.map((ressource) => {
          return meAsAPlayer?.wallet?._quantities.map((ressourceInWallet: { resourceID: number; amount: number}) => {
            return ressource.id === ressourceInWallet.resourceID ? <li>{ressource.name} : {ressourceInWallet.amount} </li> : null
          })
        })}
    
    </ul>

    </>
  )
}

export default App
