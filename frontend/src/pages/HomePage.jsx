import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCityStore from "../context/useCityStore";

const HomePage = () => {
  const { searchResults, searchError, getSearchResults } = useCityStore();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleCityClick = (searchResult) => {
    const city = searchResult.properties.context.place.name;
    const state = searchResult.properties.context.region.name;
    const lat = searchResult.geometry.coordinates[1];
    const long = searchResult.geometry.coordinates[0];

    navigate(`/city/${state}/${city}?lat=${lat}&long=${long}&preview=true`);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getSearchResults(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, getSearchResults]);

  return (
    <main className="container text-ivory-color">
      <div className="pt-4 mb-5 relative">
        {}
        <input
          type="text"
          value={searchQuery}
          placeholder="Search for a city..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-accent border-b w-full focus:border-weather-secondary animate-pulse"
        />

        {/* Search Results Dropdown */}
        {searchResults && (
          <ul className="absolute bg-weather-city-search text-ivory-color w-full shadow-md py-2 px-1 top-[66px]">
            {searchError && (
              <p>{"Sorry, looks like he's dead, Jim. Please try again"}.</p>
            )}
            {!searchError && searchResults.length === 0 && (
              <p>
                No search results for the given query, please try another search
                term
              </p>
            )}
            {!searchError &&
              searchResults.map((searchResult) => (
                <li
                  key={searchResult.id}
                  className="py-2 cursor-pointer text-ivory-color"
                  onClick={() => handleCityClick(searchResult)}
                >
                  {searchResult.properties.full_address}
                </li>
              ))}
          </ul>
        )}

        {/* Tracked Cities Header */}
        <h1 className="mt-5 text-center text-2xl whitespace-nowrap">
          Your Currently Tracked Cities
        </h1>
      </div>

      {/*Tracked Cities */}
      <div className="flex flex-col gap-4 h-[600px] overflow-y-scroll">
        {/* <Suspense fallback={<CityCardSkeleton />}>
          <CityList />
        </Suspense> */}
      </div>
    </main>
  );
};

export default HomePage;
