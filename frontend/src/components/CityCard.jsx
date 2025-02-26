import PropTypes from "prop-types";

const CityCard = ({ city, temperature, weather }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{city}</h2>
      <p className="text-gray-600">{weather}</p>
      <p className="text-lg font-bold">{temperature}°F</p>
    </div>
  );
};

CityCard.propTypes = {
  city: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string.isRequired,
};

export default CityCard;
