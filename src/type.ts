type Ressource = {
    id: number
    name: string
  }

  type Wallet =  RessourceInWallet[];

type RessourceInWallet = 
    {
        id: number
        amount: number
    }
  
  type ProductionUnit = {
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

  export type { Ressource, ProductionUnit, QuantityList, Player, Wallet}