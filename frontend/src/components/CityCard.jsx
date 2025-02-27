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
      className="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer border-4 border-weather-primary hover:animate-pulse sm:animate-none"
      tabIndex="0"
      onClick={goToCityView}
    >
      <div className="flex flex-col flex-1">
        <h2 className="text-3xl">{city.city}</h2>
        <h3>{city.state}</h3>
      </div>
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
  }).isRequired,
};

export default CityCard;
