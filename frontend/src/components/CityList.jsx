import { useEffect, useState } from "react";
import CityCard from "./CityCard";
import CityCardSkeleton from "./CityCardSkeleton";
import useCityStore from "../context/useCityStore";

const CityList = () => {
  const { savedCities, getCities } = useCityStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCities().finally(() => setLoading(false));
  }, [getCities]);

  return (
    <div className="border-4 border-[var(--color-weather-secondary)]">
      {loading ? (
        [...Array(3)].map((_, index) => <CityCardSkeleton key={index} />)
      ) : savedCities.length > 0 ? (
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
