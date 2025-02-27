import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const CityCard = ({ city }) => {
  const navigate = useNavigate();

  const goToCityView = () => {
    navigate({
      pathname: `/city/${city.state}/${city.city}`,
      search: `?id=${city.id}&lat=${city.coords.lat}&long=${city.coords.long}`,
    });
  };

  return (
    <div
      className="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer border-4 border-[var(--color-weather-primary)] hover:animate-pulse sm:animate-none"
      tabIndex="0"
      onClick={goToCityView}
    >
      {/* Left Side - City Name and State */}
      <div className="flex flex-col flex-1">
        <h2 className="text-3xl">{city.city}</h2>
        <h3>{city.state}</h3>
      </div>
      {/* Right Side - Weather Info */}
      {city.weather && (
        <div className="text-right">
          <p className="text-3xl">{Math.round(city.weather.current.temp)}°</p>
          <p className="text-sm opacity-75">
            H: {Math.round(city.weather.daily[0].temp.max)}° L:{" "}
            {Math.round(city.weather.daily[0].temp.min)}°
          </p>
          <p className="capitalize text-sm opacity-80">
            {city.weather.current.weather[0].description}
          </p>
        </div>
      )}
    </div>
  );
};

CityCard.propTypes = {
  city: PropTypes.shape({
    id: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    coords: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.shape({
      current: PropTypes.shape({
        temp: PropTypes.number.isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            description: PropTypes.string.isRequired,
          })
        ),
      }),
      daily: PropTypes.arrayOf(
        PropTypes.shape({
          temp: PropTypes.shape({
            max: PropTypes.number.isRequired,
            min: PropTypes.number.isRequired,
          }),
        })
      ),
    }),
  }).isRequired,
};

export default CityCard;
