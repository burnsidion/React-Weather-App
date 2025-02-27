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
      if (data) setWeatherData(processWeatherData(data));
      setLoading(false);
    };

    getWeather();
  }, [city, state, lat, long, fetchWeatherData]);

  const processWeatherData = (data) => {
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = data.current.dt * 1000 + localOffset;
    data.currentTime = utc + 1000 * data.timezone_offset;

    data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * data.timezone_offset;
    });

    return data;
  };

  const formatHourlyData = (hour) => ({
    time: new Date(hour.currentTime).toLocaleTimeString("en-us", {
      hour: "numeric",
    }),
    temp: Math.round(hour.temp),
    icon: hour.weather[0].icon,
  });

  const formatDailyData = (day) => ({
    day: new Date(day.dt * 1000).toLocaleDateString("en-us", {
      weekday: "long",
    }),
    tempMax: Math.round(day.temp.max),
    tempMin: Math.round(day.temp.min),
    icon: day.weather[0].icon,
  });

  const removeCity = () => {
    const updatedCities = savedCities.filter(
      (c) => !(c.city === city && c.state === state)
    );
    localStorage.setItem("savedCities", JSON.stringify(updatedCities));

    getCities();
    navigate("/");
  };

  const formatCurrentDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-us", {
      weekday: "short",
      day: "2-digit",
      month: "long",
    });
  };

  const formatCurrentTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (loading) return <p>Loading weather data...</p>;

  return (
    <div className="flex flex-col flex-1 items-center">
      {/* Banners */}
      {isPreview ? (
        <div className="text-ivory-color p-4 bg-weather-secondary w-full text-center">
          <p>
            {`You are currently previewing this city, click the "+" to track this
            city!`}
          </p>
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
          {weatherData
            ? formatCurrentDate(weatherData.currentTime)
            : "Loading date..."}
          {", "}
          {weatherData
            ? formatCurrentTime(weatherData.currentTime)
            : "Loading time..."}
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

      <hr className="border-white opacity-10 border w-full" />

      {/* Hourly Weather (48 Hours) */}
      <div className="max-w-screen-md w-full py-12">
        <div className="mx-8 text-ivory-color">
          <h2 className="mb-4">Hourly Weather</h2>
          <div className="flex gap-10 overflow-x-scroll">
            {weatherData.hourly.map((hour) => {
              const { time, temp, icon } = formatHourlyData(hour);
              return (
                <div key={hour.dt} className="flex flex-col gap-4 items-center">
                  <p className="whitespace-nowrap text-md">{time}</p>
                  <img
                    className="w-auto h-[50px] object-cover"
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt="Weather condition"
                  />
                  <p className="text-xl">{temp}°</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <hr className="border-white opacity-10 border w-full" />

      {/* Weekly Weather */}
      <div className="max-w-screen-md w-full py-12">
        <div className="mx-8 text-ivory-color">
          <h2 className="mb-4">7 Day Forecast</h2>
          {weatherData.daily.map((day) => {
            const {
              day: dayOfWeek,
              tempMax,
              tempMin,
              icon,
            } = formatDailyData(day);
            return (
              <div key={day.dt} className="flex items-center">
                <p className="flex-1">{dayOfWeek}</p>
                <img
                  className="w-[50px] h-[50px] object-cover"
                  src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt="Weather condition"
                />
                <div className="flex gap-2 flex-1 justify-end">
                  <p>H: {tempMax}°</p>
                  <p>L: {tempMin}°</p>
                </div>
              </div>
            );
          })}
        </div>
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
