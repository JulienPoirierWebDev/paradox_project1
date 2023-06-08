import * as Paradox from "@thetinyspark/paradox";
import { useEffect, useState } from "react";
import {data } from "./assets/data2";
import RessourceList from "./components/RessourceList";
import useGameEngine from "./hooks/useGameEngine";


const engine = (Paradox as any).engine;
const appConstants = (Paradox as any).appConstants;
const defaultContainer = (Paradox as any).defaultContainer;

if(!engine.getFacade()){
  console.log("Engine not initialized")
  engine.init(defaultContainer, data);
}

function App() {

  const {ressources, getRessources, player, getPlayer, doCycle, wallet, getWallet} = useGameEngine();

useEffect(() => {
  const doCycleInterval = setInterval(() => {
    doCycle();
    getPlayer();
    getWallet();
   
  }, 1000);

  return () => {
    clearInterval(doCycleInterval);
  }


}, [ doCycle, getPlayer, player, getRessources, getWallet]);

  return (
    <>
      <p>Paradox game test</p>
      {/*}
      <h2>Liste des ressources dans le jeu</h2>
      <ul>
        {ressources.map((ressource) => (
          <li key={ressource.id}>{ressource.name}</li>
        ))}
      </ul>

      <h2>Liste des accumulateurs de ressources</h2>
      <ul>
        {productionUnits.map((ProductionUnit) => (
          <li key={ProductionUnit.id}>{ProductionUnit.name}</li>
        ))}
      </ul>
        */}

      <h2>{player?.name}</h2>
      {player ? <RessourceList ressources={ressources} wallet={wallet}/> : null}


    </>
  )
}

export default App

