import "./index.css";
import CityCard from "./components/CityCard";
function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <CityCard city="Boulder" temperature={72} weather="Sunny" />
    </div>
  );
}

export default App;
