import { BrowserRouter } from "react-router-dom";
import { CityProvider } from "./context/CityProvider";
import HomePage from "./pages/HomePage";
import SiteNavigation from "./components/SiteNavigation";

function App() {
  return (
    <CityProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen font-Roboto bg-weather-primary">
          <SiteNavigation />
          <main className="flex-grow">
            <HomePage />
          </main>
        </div>
      </BrowserRouter>
    </CityProvider>
  );
}

export default App;
