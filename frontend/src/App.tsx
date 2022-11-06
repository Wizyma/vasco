import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import vascoLogo from "./assets/vasco.svg";
// import "./App.css";
import { Sidebar } from "./components/Menu";
import { menus } from "./routes";

function App() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  return (
    <Flex>
      <Sidebar items={menus} onClick={item => setSelectedPath(item)} />
      <div className="App">
        <div>
          <img src={vascoLogo} className="logo vasco" alt="Vasco logo" />
        </div>
        <h1>Vasco Frontend Challenge</h1>
        <p>Good luck and have fun!</p>
      </div>
    </Flex>
  );
}

export default App;
