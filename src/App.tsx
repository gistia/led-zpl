import "./App.css";
import Canvas from "./Canvas";
import Palette from "./Palette";
import Properties from "./Properties";

function App() {
  return (
    <div className="h-screen flex">
      <Palette />
      <Canvas />
      <Properties />
    </div>
  );
}

export default App;
