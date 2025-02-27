import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";
import SiteNavigation from "./components/SiteNavigation";
import { CityProvider } from "./context/CityProvider";

function App() {
  return (
    <CityProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen font-Roboto bg-weather-primary">
          <SiteNavigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/city/:state/:city" element={<CityPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CityProvider>
  );
}

export default App;
