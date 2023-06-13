import * as Paradox from "@thetinyspark/paradox";
import TemplateBuilding from '@thetinyspark/paradox/dist/core/model/schema/building/TemplateBuilding';
import City from '@thetinyspark/paradox/dist/core/model/schema/city/City';
import Quantity from '@thetinyspark/paradox/dist/core/model/schema/resources/Quantity';
import Resource from '@thetinyspark/paradox/dist/core/model/schema/resources/Resource';
import React, { useCallback, useState } from 'react'
import { data } from "../assets/data2";


const engine = Paradox.engine;

export type GameContextType = {
    ressources: Resource[],
    productionUnits: TemplateBuilding[],
    player: City | undefined,
    wallet: Quantity[] | undefined,
    getRessources: () => void,
    getProductionUnits: () => void,
    getPlayer: () => void,
    getWallet: () => void,
    doCycle: () => void,
    reset: () => void
}

export const GameContext = React.createContext<GameContextType | null>(null);


export default function GameContextProvider({children}: {children: React.ReactNode}) {


    const [ressources, setRessources] = useState<Resource[]>([])
    const [productionUnits, setProductionUnits] = useState<TemplateBuilding[]>([])
    const [player, setPlayer] = useState<City>()
    const [wallet, setWallet] = useState<Quantity[]>();
  
    // exemple qui permet d'obtenir la liste des ressources configurées sur le moteur
    const getRessources = useCallback(() => {
      engine.getResources().then( 
        (resources)=>{
            setRessources(resources);    
            }
          )
    }, []);

  
    const getProductionUnits = useCallback(() => {
      engine.getTemplateBuildings().then(
        (templates)=>{          
            setProductionUnits(templates);    
        }
      )
    }, []);
  
    const getPlayer = () => {
      engine.getCities().then(
        (cities)=>{
            
            setPlayer(cities[0]);    
        }
      )
    }
  
    const getWallet = () => {
      engine.getCities().then(
        async (cities)=>{
          setWallet(cities[0].wallet.clone().get())
        }
      )
    }
  
  
    const doCycle = () => {      
      engine.doCycle()
    }

    const reset = () => {
        engine.reset();
        engine.restoreGameData(data)
    }
  
    getRessources();
    getProductionUnits();
    getPlayer();
    getWallet()


    const values = {
        ressources,
        productionUnits,
        player,
        wallet,
        getRessources,
        getProductionUnits,
        getPlayer,
        getWallet,
        doCycle,
        reset
}

  return (
    <GameContext.Provider value={values}>
        {children}
    </GameContext.Provider>
  )
}

  