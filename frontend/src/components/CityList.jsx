import { useEffect } from "react";
import CityCard from "./CityCard";
import useCityStore from "../context/useCityStore";

const CityList = () => {
  const { savedCities, getCities } = useCityStore();

  useEffect(() => {
    getCities();
  }, [getCities]);

  return (
    <div className="border-4 border-weather-secondary">
      {savedCities.length > 0 ? (
        savedCities.map((city) => <CityCard key={city.id} city={city} />)
      ) : (
        <p className="text-center">
          No locations added. To start tracking a location, search in the field
          above.
        </p>
      )}
    </div>
  );
};

export default CityList;
