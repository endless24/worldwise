import propTypes from "prop-types";

import styles from "./CountryItem.module.css";
import { useCities } from "../contexts/CitiesContext";

function CountryItem({ country }) {
  const { convertToEmoji } = useCities();
  return (
    <li className={styles.countryItem}>
      <span>{convertToEmoji(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}
CountryItem.propTypes = {
  country: propTypes.object.isRequired,
};

export default CountryItem;
