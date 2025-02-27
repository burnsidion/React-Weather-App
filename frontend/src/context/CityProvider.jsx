import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [savedCities, setSavedCities] = useState([]);

  CityProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const weatherUrl = `${import.meta.env.VITE_API_URL}/api/weather`;

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

  useEffect(() => {
    getCities();
  }, [getCities]);

  return (
    <CityContext.Provider value={{ savedCities, getCities }}>
      {children}
    </CityContext.Provider>
  );
};
