import { useState } from "react";

// import CityList from "../components/CityList";
// import CityCardSkeleton from "../components/CityCardSkeleton";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapboxSearchResults, setMapboxSearchResults] = useState(null);
  const [searchError, setSearchError] = useState(false);

  return (
    <main className="container text-ivory-color">
      <div className="pt-4 mb-5 relative">
        <input
          type="text"
          value={searchQuery}
          placeholder="Search for a city..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-accent border-b w-full focus:border-weather-secondary animate-pulse"
        />

        {mapboxSearchResults && (
          <ul className="absolute bg-weather-city-search text-ivory-color w-full shadow-md py-2 px-1 top-[66px]">
            {searchError && (
              <p>{"Sorry, looks like he's dead, Jim. Please try again."}</p>
            )}
            {!searchError && mapboxSearchResults.length === 0 && (
              <p>
                No search results for given query, please try another search
                term
              </p>
            )}
            {!searchError &&
              mapboxSearchResults.map((searchResult) => (
                <li
                  key={searchResult.id}
                  className="py-2 cursor-pointer text-ivory-color"
                  // onClick={() => previewCity(searchResult)} // To be implemented
                >
                  {searchResult.properties.full_address}
                </li>
              ))}
          </ul>
        )}

        <h1 className="mt-5 text-center text-2xl whitespace-nowrap">
          Your Currently Tracked Cities
        </h1>
      </div>

      <div className="nfc-city-list flex flex-col gap-4 h-[600px] overflow-y-scroll">
        {/* <Suspense fallback={<CityCardSkeleton />}>
          <CityList />
        </Suspense> */}
      </div>
    </main>
  );
};

export default HomePage;
