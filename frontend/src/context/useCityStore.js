import { useContext } from "react";
import { CityContext } from "./CityProvider";

const useCityStore = () => useContext(CityContext);

export default useCityStore;
