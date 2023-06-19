import * as Paradox from "@thetinyspark/paradox";
import { data } from "./utils/gameData";

import { defaultContainer } from "@thetinyspark/paradox";
import Page from "./components/Page";

const engine = Paradox.engine;

if (!engine.getFacade()) {
  console.log("Engine will initialized");
  engine.init(defaultContainer, data);
  console.log("Engine initialized");
}

function App() {
  return <Page />;
}

export default App;
