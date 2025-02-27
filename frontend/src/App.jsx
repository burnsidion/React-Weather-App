import "./index.css";
import HomePage from "./pages/HomePage";
import SiteNavigation from "./components/SiteNavigation";

function App() {
  return (
    <div className="flex flex-col min-h-screen font-Roboto bg-weather-primary">
      <SiteNavigation />
      <main className="flex-grow">
        <HomePage />
      </main>
    </div>
  );
}

export default App;
