import { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "./Modal";

const SiteNavigation = () => {
  console.log("✅ SiteNavigation is rendering...");
  const [modalActive, setModalActive] = useState(false);

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  return (
    <header className="sticky top-0 bg-weather-primary shadow-lg">
      <nav className="container flex flex-col sm:flex-row items-center gap-4 text-ivory-color py-6">
        <Link to="/">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-sun text-2xl animate-pulse"></i>
            <p className="text-2xl hover:animate-pulse">
              {"What's the Weather?"}
            </p>
          </div>
        </Link>

        <div className="flex gap-3 flex-1 justify-end">
          <i
            className="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
            onClick={toggleModal}
          ></i>
          {/* We'll implement the add city functionality later */}
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
