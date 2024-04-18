// import propTypes from "prop-types";

import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();

  //loading
  if (isLoading) return <Spinner />;
  // getting message across users, when no city in the list
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
// CityList.propTypes = {
//   cities: propTypes.array.isRequired, // Define prop type for cities as an array
//   isLoading: propTypes.bool.isRequired, // Define prop type for isLoading as a boolean
// };

export default CityList;
