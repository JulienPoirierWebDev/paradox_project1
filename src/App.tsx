import * as Paradox from "@thetinyspark/paradox";
import { data } from "./assets/data2";

import { defaultContainer } from "@thetinyspark/paradox";
import GameContextProvider from "./context/GameContext";
import Page from "./components/Page";

const engine = Paradox.engine;

if (!engine.getFacade()) {
  console.log("Engine will initialized");
  engine.init(defaultContainer, data);
  console.log("Engine initialized");
}

function App() {
  return (
    <GameContextProvider>
      <Page />
    </GameContextProvider>
  );
}

export default App;
