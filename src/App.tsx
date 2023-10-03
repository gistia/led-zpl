import "./App.css";
import Canvas from "./Canvas";
import Commands from "./Commands";
import Palette from "./Palette";
import Properties from "./Properties";

function App() {
  return (
    <div className="h-screen flex">
      <Palette />
      <Canvas />
      <Commands />
      <Properties />
    </div>
  );
}

export default App;
