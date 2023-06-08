import * as Paradox from "@thetinyspark/paradox";
import { useState } from "react";
import { Ressource, ProductionUnit, Player, Wallet } from "../type";


const engine = (Paradox as any).engine;
const appConstants = (Paradox as any).appConstants;


const useGameEngine = () => {
    const [ressources, setRessources] = useState<Ressource[]>([])
    const [productionUnits, setProductionUnits] = useState<ProductionUnit[]>([])
    const [player, setPlayer] = useState<Player>()
    const [wallet, setWallet] = useState<Wallet>([]);
  
    // exemple qui permet d'obtenir la liste des ressources configurées sur le moteur
    const getRessources = () => {
      engine.getFacade().query(appConstants.GET_RESOURCES_QUERY).then( 
        (resources: Ressource[])=>{
            setRessources(resources);    
            }
          )
    }
  
    const getProductionUnits = () => {
      engine.getFacade().query(appConstants.GET_TEMPLATES_BUILDINGS_QUERY).then(
        (templates: ProductionUnit[])=>{
            setProductionUnits(templates);    
        }
      )
    }
  
    const getPlayer = () => {
      engine.getFacade().query(appConstants.GET_CITIES_QUERY).then(
        (cities: Player[])=>{
            
            setPlayer(cities[0]);    
        }
      )
    }
  
    const getWallet = () => {
      engine.getFacade().query(appConstants.GET_CITIES_QUERY).then(
        (cities: Player[])=>{
          const wallet = [];
          for (let i = 0; i < cities[0].wallet._quantities.length; i++) {
            const element = {
              id: cities[0].wallet._quantities[i].resourceID,
              amount: cities[0].wallet._quantities[i].amount
            };
            wallet.push(element);
          }
  
            
            setWallet(wallet);    
        }
      )
    }
  
  
    const doCycle = async () => {
      await engine.getFacade().query(appConstants.DO_CYCLE)
    }
  
    getRessources();
    getProductionUnits();
    getPlayer();
  
    return {ressources, getRessources, productionUnits, getProductionUnits, player, getPlayer, doCycle, wallet, getWallet}
  }

    export default useGameEngine;