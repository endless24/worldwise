import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

function CityList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
CityList.propTypes = {
  cities: PropTypes.array.isRequired, // Define prop type for cities as an array
  isLoading: PropTypes.bool.isRequired, // Define prop type for isLoading as a boolean
};

export default CityList;
