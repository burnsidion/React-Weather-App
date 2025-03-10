import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCircleInfo, faPlus } from "@fortawesome/free-solid-svg-icons";
import { uid } from "uid";

import Modal from "./Modal";

const SiteNavigation = () => {
  const [modalActive, setModalActive] = useState(false);
  const [savedCities, setSavedCities] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  const addCity = () => {
    const params = new URLSearchParams(location.search);
    const isPreview = params.get("preview");

    if (!isPreview) return;

    const city = decodeURIComponent(location.pathname.split("/")[3]);
    const state = decodeURIComponent(location.pathname.split("/")[2]);
    const lat = params.get("lat");
    const long = params.get("long");

    if (!city || !state || !lat || !long) return;

    const storedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

    const cityExists = storedCities.some(
      (c) => c.city === city && c.state === state
    );

    if (!cityExists) {
      const newCity = {
        id: uid(),
        city,
        state,
        coords: { lat, long },
      };

      const updatedCities = [...storedCities, newCity];
      localStorage.setItem("savedCities", JSON.stringify(updatedCities));
      setSavedCities(updatedCities);

      params.delete("preview");
      params.set("id", newCity.id);
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  };

  return (
    <header className="sticky top-0 bg-weather-primary shadow-lg">
      <nav className="container flex flex-col sm:flex-row items-center gap-4 text-ivory-color py-6">
        <Link to="/">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faSun} className="text-2xl animate-pulse" />
            <p className="text-2xl hover:animate-pulse">
              {"What's the Weather?"}
            </p>
          </div>
        </Link>

        <div className="flex gap-3 flex-1 justify-end">
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="text-xl hover:text-weather-secondary duration-150 cursor-pointer"
            onClick={toggleModal}
          />
          {/* Only show "+" icon when previewing a city */}
          {new URLSearchParams(location.search).get("preview") && (
            <FontAwesomeIcon
              icon={faPlus}
              className="text-xl hover:text-weather-secondary duration-150 cursor-pointer"
              onClick={addCity}
            />
          )}
        </div>
      </nav>
      <Modal isActive={modalActive} onClose={toggleModal}>
        <div className="text-black p-4">
          <h1 className="text-2xl mb-1">About:</h1>
          <p className="mb-4">
            {`What's the Weather allows you to track the current and
      future weather of cities of your choosing.`}
          </p>
          <h2 className="text-2xl">How it works:</h2>
          <ol className="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results to see the current weather.
            </li>
            <li>
              {"Track the city by clicking the " +
                " icon, saving it to the homepage."}
            </li>
          </ol>

          <h2 className="text-2xl">Removing a city</h2>
          <p>
            To remove a city, select it on the homepage and use the delete
            option.
          </p>
        </div>
      </Modal>
    </header>
  );
};

export default SiteNavigation;
