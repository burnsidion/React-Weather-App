import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import useCityStore from "../context/useCityStore";

const AsyncCityView = () => {
  const { city, state } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getCities, fetchWeatherData, savedCities } = useCityStore();

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  const lat = searchParams.get("lat");
  const long = searchParams.get("long");
  const isPreview = searchParams.get("preview") === "true";

  // Check if the city is already being tracked
  useEffect(() => {
    if (!isPreview) {
      const isCityTracked = savedCities.some(
        (c) => c.city === city && c.state === state
      );
      setShowBanner(isCityTracked);
      setTimeout(() => setShowBanner(false), 3000);
    }
  }, [isPreview, savedCities, city, state]);

  useEffect(() => {
    const getWeather = async () => {
      setLoading(true);
      const data = await fetchWeatherData({ city, state, lat, lon: long });
      if (data) setWeatherData(data);
      setLoading(false);
    };

    getWeather();
  }, [city, state, lat, long, fetchWeatherData]);

  const removeCity = () => {
    const updatedCities = savedCities.filter(
      (c) => !(c.city === city && c.state === state)
    );
    localStorage.setItem("savedCities", JSON.stringify(updatedCities));

    getCities();
    navigate("/");
  };

  if (loading) return <p>Loading weather data...</p>;

  return (
    <div className="flex flex-col flex-1 items-center">
      {/* Banners */}
      {isPreview ? (
        <div className="text-ivory-color p-4 bg-weather-secondary w-full text-center">
          <p>{`You are currently previewing this city, click the "+" to track this city!`}</p>
        </div>
      ) : showBanner ? (
        <div className="text-ivory-color p-4 bg-weather-secondary w-full text-center">
          <p>You are currently tracking this city!</p>
        </div>
      ) : null}

      {/* Weather Overview */}
      <div className="flex flex-col items-center text-ivory-color py-12">
        <h1 className="text-4xl mb-2">{city}</h1>
        <p className="text-sm mb-12">
          {new Date().toLocaleDateString("en-us", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })}
        </p>
        <p className="text-8xl mb-8 ml-6">
          {Math.round(weatherData.current.temp)}°
        </p>
        <p>Feels Like: {Math.round(weatherData.current.feels_like)}°</p>
        <p className="capitalize">
          {weatherData.current.weather[0].description}
        </p>
        <img
          className="w-[150px] h-auto"
          src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
          alt="Weather condition"
        />
      </div>

      {/* Remove City Button */}
      {!isPreview && (
        <div
          className="flex items-center gap-2 py-12 text-ivory-color cursor-pointer duration-150 hover:text-red-500 hover:animate-ping"
          onClick={removeCity}
        >
          <i className="fa-solid fa-trash"></i>
          <p>Remove City</p>
        </div>
      )}
    </div>
  );
};

export default AsyncCityView;
