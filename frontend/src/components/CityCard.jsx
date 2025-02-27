import PropTypes from "prop-types";

const CityCard = ({ city }) => {
  return (
    <div
      className="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer border-4 border-weather-primary hover:animate-pulse sm:animate-none"
      tabIndex="0"
    >
      <div className="flex flex-col flex-1">
        <h2 className="text-3xl">{city.city}</h2>
        <h3>{city.state}</h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-3xl self-end">
          {rounder(city.weather.current.temp)}°
        </p>
        <div className="flex gap-2 self-end">
          <span className="text-xs self-end">
            H: {rounder(city.weather.daily[0].temp.max)}°
          </span>
          <span className="text-xs">L: {city.weather.daily[0].temp.min}</span>
        </div>
        <span className="text-xs">
          L: {rounder(city.weather.daily[0].temp.min)}°
        </span>
      </div>
    </div>
  );
};

CityCard.propTypes = {
  city: PropTypes.shape({
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    weather: PropTypes.shape({
      current: PropTypes.shape({
        temp: PropTypes.number.isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            description: PropTypes.string.isRequired,
          })
        ).isRequired,
      }).isRequired,
      daily: PropTypes.arrayOf(
        PropTypes.shape({
          temp: PropTypes.shape({
            max: PropTypes.number.isRequired,
            min: PropTypes.number.isRequired,
          }).isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

const rounder = (num) => Math.round(num);
export default CityCard;
