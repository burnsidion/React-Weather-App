import "./index.css";
import CityCard from "./components/CityCard";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* <CityCard city="Boulder" temperature={72} weather="Sunny" /> */}
      <HomePage />
    </div>
  );
}

export default App;
