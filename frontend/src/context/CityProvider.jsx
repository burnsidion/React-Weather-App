import { createContext, useState, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [savedCities, setSavedCities] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [searchError, setSearchError] = useState(false);

  const weatherUrl = `${import.meta.env.VITE_API_BASE_URL}/api/weather`;
  const mapboxUrl = `${import.meta.env.VITE_API_BASE_URL}/api/search`;

  const getCities = useCallback(async () => {
    const storedCities = localStorage.getItem("savedCities");
    if (storedCities) {
      const parsedCities = JSON.parse(storedCities);
      setSavedCities(parsedCities);

      try {
        const requests = parsedCities.map((city) =>
          axios
            .get(
              `${weatherUrl}?q=${encodeURIComponent(
                JSON.stringify({
                  city: city.city,
                  state: city.state,
                  lat: city.coords.lat,
                  lon: city.coords.long,
                })
              )}`
            )
            .then((res) => res.data)
        );

        const weatherData = await Promise.all(requests);
        await new Promise((res) => setTimeout(res, 1000));

        const updatedCities = parsedCities.map((city, index) => ({
          ...city,
          weather: weatherData[index],
        }));

        setSavedCities(updatedCities);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  }, [weatherUrl]);

  const fetchWeatherData = useCallback(
    async ({ city, state, lat, lon }) => {
      try {
        const response = await axios.get(
          `${weatherUrl}?q=${encodeURIComponent(
            JSON.stringify({ city, state, lat, lon })
          )}`
        );

        const weather = response.data;
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = weather.current.dt * 1000 + localOffset;
        weather.currentTime = utc + 1000 * weather.timezone_offset;

        weather.hourly.forEach((hour) => {
          const utcHour = hour.dt * 1000 + localOffset;
          hour.currentTime = utcHour + 1000 * weather.timezone_offset;
        });

        return weather;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
      }
    },
    [weatherUrl]
  );

  const getSearchResults = useCallback(
    async (query) => {
      if (!query) {
        setSearchResults(null);
        setSearchError(false);
        return;
      }

      try {
        const response = await axios.get(`${mapboxUrl}?q=${query}&types=place`);
        setSearchResults(response.data.features);
        setSearchError(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchError(true);
      }
    },
    [mapboxUrl]
  );

  return (
    <CityContext.Provider
      value={{
        savedCities,
        getCities,
        searchResults,
        searchError,
        getSearchResults,
        fetchWeatherData,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

CityProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
