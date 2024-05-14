import propTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

// formatting the date
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    // weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();

  const { emoji, cityName, date, id, position } = city;

  // converting timestamp to js date
  const timestampInSeconds = date?.seconds;
  const dateStamp = new Date(timestampInSeconds * 1000);

  //the handleDelete function that triggers the delete
  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position?.lat}&lng=${position?.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>

        <h3 className={styles.name}>{cityName}</h3>

        <time className={styles.date}>({formatDate(dateStamp)})</time>

        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}
CityItem.propTypes = {
  city: propTypes.object.isRequired,
};

export default CityItem;
