import "./App.css";
import Canvas from "./Canvas";
import Commands from "./Commands";
import Header from "./Header";
import Palette from "./Palette";
import Properties from "./Properties";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Palette />
        <Canvas />
        <Commands />
        <Properties />
      </div>
    </div>
  );
}

export default App;
