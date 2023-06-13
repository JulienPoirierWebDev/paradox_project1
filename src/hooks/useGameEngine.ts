import * as Paradox from "@thetinyspark/paradox";
import { useCallback, useState } from "react";
import City from "@thetinyspark/paradox/dist/core/model/schema/city/City";
import Resource from "@thetinyspark/paradox/dist/core/model/schema/resources/Resource";
import TemplateBuilding from "@thetinyspark/paradox/dist/core/model/schema/building/TemplateBuilding";
import Quantity from "@thetinyspark/paradox/dist/core/model/schema/resources/Quantity";


const engine = Paradox.engine;


const useGameEngine = () => {
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
  
    getRessources();
    getProductionUnits();
    getPlayer();
    getWallet()
  
    return {ressources, getRessources, productionUnits, getProductionUnits, player, getPlayer, doCycle, wallet, getWallet}
  }

    export default useGameEngine;